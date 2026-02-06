import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayerData {
  id: string;
  label: string;
  labelAr: string;
  description: string;
  zOffset: number;
  xOffset: number;
  yOffset: number;
  rotation: number;
  color: string;
}

interface ExplodedPlaceViewProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  englishDescription?: string;
  mapLink: string;
  icon: React.ReactNode;
}

const layers: LayerData[] = [
  {
    id: "background",
    label: "Landscape",
    labelAr: "المنظر الطبيعي",
    description: "Majestic mountain backdrop with pristine cloudscapes",
    zOffset: -120,
    xOffset: -40,
    yOffset: -30,
    rotation: -3,
    color: "hsl(152 35% 35%)",
  },
  {
    id: "midground",
    label: "Architecture",
    labelAr: "العمارة",
    description: "Traditional Faifa stone structures and terraces",
    zOffset: 0,
    xOffset: 20,
    yOffset: 0,
    rotation: 0,
    color: "hsl(152 35% 45%)",
  },
  {
    id: "foreground",
    label: "Experience",
    labelAr: "التجربة",
    description: "Immersive hospitality and authentic atmosphere",
    zOffset: 100,
    xOffset: 60,
    yOffset: 30,
    rotation: 3,
    color: "hsl(152 35% 55%)",
  },
];

const ExplodedPlaceView = ({
  isOpen,
  onClose,
  title,
  description,
  englishDescription,
  mapLink,
  icon,
}: ExplodedPlaceViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  const parallaxValues = [parallaxY1, parallaxY2, parallaxY3];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    if (isOpen) {
      window.addEventListener("mousemove", handleMouseMove);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const scrollToMap = () => {
    onClose();
    setTimeout(() => {
      const mapSection = document.querySelector("#interactive-map");
      mapSection?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 bg-[hsl(220_20%_8%)] overflow-y-auto"
        >
          {/* Ambient background effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          {/* Close button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="fixed top-6 right-6 z-50"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-white rounded-full w-12 h-12"
            >
              <X className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Main content */}
          <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
            {/* Title section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center mb-16 relative z-10"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="text-primary text-3xl">{icon}</div>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                {title}
              </h2>
              {description && (
                <p className="text-white/70 text-lg max-w-md mx-auto">
                  {description}
                </p>
              )}
            </motion.div>

            {/* Exploded layers container */}
            <div 
              className="relative w-full max-w-5xl mx-auto"
              style={{ perspective: "1200px" }}
            >
              <div className="relative h-[500px] md:h-[600px]">
                {layers.map((layer, index) => (
                  <motion.div
                    key={layer.id}
                    initial={{ 
                      opacity: 0, 
                      x: 0, 
                      y: 0, 
                      z: 0,
                      rotateY: 0,
                    }}
                    animate={{ 
                      opacity: 1,
                      x: layer.xOffset + mousePosition.x * (index + 1) * 0.3,
                      y: layer.yOffset + mousePosition.y * (index + 1) * 0.3,
                      rotateY: layer.rotation + mousePosition.x * 0.1,
                    }}
                    transition={{ 
                      delay: 0.3 + index * 0.15,
                      duration: 0.8,
                      type: "spring",
                      stiffness: 100,
                    }}
                    style={{
                      y: parallaxValues[index],
                      transformStyle: "preserve-3d",
                      transform: `translateZ(${layer.zOffset}px)`,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {/* Layer card */}
                    <div 
                      className="relative w-64 md:w-80 h-48 md:h-56 rounded-2xl overflow-hidden shadow-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${layer.color}, hsl(220 20% 15%))`,
                        boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)`,
                      }}
                    >
                      {/* Layer content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4">
                          <div className="w-8 h-8 rounded-full bg-white/20" />
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-1">
                          {layer.labelAr}
                        </h3>
                        <p className="text-white/50 text-sm">
                          {layer.label}
                        </p>
                      </div>

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>

                    {/* Connector line and label */}
                    <ConnectorLine 
                      layer={layer} 
                      index={index} 
                      delay={0.6 + index * 0.2}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom info section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-16 text-center relative z-10"
            >
              {englishDescription && (
                <p className="text-white/50 text-sm mb-8 max-w-lg mx-auto italic">
                  {englishDescription}
                </p>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full"
                >
                  <a 
                    href={mapLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open in Maps</span>
                  </a>
                </Button>

                <Button
                  variant="ghost"
                  onClick={scrollToMap}
                  className="text-white/70 hover:text-white hover:bg-white/10 px-6 py-3 rounded-full"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>View on Interactive Map</span>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-sm flex flex-col items-center gap-2"
          >
            <span>Move mouse to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Animated connector line component
const ConnectorLine = ({ 
  layer, 
  index, 
  delay 
}: { 
  layer: LayerData; 
  index: number; 
  delay: number;
}) => {
  const isLeft = index % 2 === 0;
  const lineLength = 120 + index * 30;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.8 }}
      className={`absolute ${isLeft ? 'right-full mr-4' : 'left-full ml-4'} top-1/2 -translate-y-1/2`}
      style={{ width: lineLength }}
    >
      {/* SVG connector line */}
      <svg 
        className="absolute inset-0 w-full h-20 overflow-visible"
        style={{ top: "-40px" }}
      >
        <motion.path
          d={isLeft 
            ? `M ${lineLength} 40 Q ${lineLength * 0.6} 40 ${lineLength * 0.4} ${20 + index * 10} L 0 ${20 + index * 10}`
            : `M 0 40 Q ${lineLength * 0.4} 40 ${lineLength * 0.6} ${20 + index * 10} L ${lineLength} ${20 + index * 10}`
          }
          stroke="url(#lineGradient)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: delay + 0.2, duration: 1, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>
        </defs>
        
        {/* Animated dot on line */}
        <motion.circle
          r="3"
          fill="white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: delay + 1, duration: 2, repeat: Infinity }}
        >
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path={isLeft 
              ? `M ${lineLength} 40 Q ${lineLength * 0.6} 40 ${lineLength * 0.4} ${20 + index * 10} L 0 ${20 + index * 10}`
              : `M 0 40 Q ${lineLength * 0.4} 40 ${lineLength * 0.6} ${20 + index * 10} L ${lineLength} ${20 + index * 10}`
            }
          />
        </motion.circle>
      </svg>

      {/* Text label */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: delay + 0.5, duration: 0.5 }}
        className={`absolute ${isLeft ? 'right-full pr-4' : 'left-full pl-4'} top-1/2 -translate-y-1/2 whitespace-nowrap`}
      >
        <div className={`text-${isLeft ? 'right' : 'left'}`}>
          <p className="text-white/80 text-sm font-medium">{layer.labelAr}</p>
          <p className="text-white/40 text-xs">{layer.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExplodedPlaceView;
