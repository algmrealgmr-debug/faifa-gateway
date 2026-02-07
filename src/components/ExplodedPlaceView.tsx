import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    xOffset: -80,
    yOffset: -40,
    rotation: -5,
    color: "hsl(152 35% 35%)",
  },
  {
    id: "midground",
    label: "Architecture",
    labelAr: "العمارة",
    description: "Traditional Faifa stone structures and terraces",
    zOffset: 0,
    xOffset: 0,
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
    xOffset: 80,
    yOffset: 40,
    rotation: 5,
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
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
                      scale: 0.8,
                      rotateY: 0,
                      rotateX: 10,
                    }}
                    animate={{ 
                      opacity: 1,
                      x: layer.xOffset,
                      y: layer.yOffset,
                      scale: 1,
                      rotateY: layer.rotation,
                      rotateX: 0,
                    }}
                    transition={{ 
                      delay: 0.4 + index * 0.25,
                      duration: 1.2,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      transform: `translateZ(${layer.zOffset}px)`,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {/* Layer card */}
                    <motion.div 
                      className="relative w-64 md:w-80 h-48 md:h-56 rounded-2xl overflow-hidden shadow-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${layer.color}, hsl(220 20% 15%))`,
                        boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)`,
                      }}
                      initial={{ boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)" }}
                      animate={{ 
                        boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)` 
                      }}
                      transition={{ delay: 0.6 + index * 0.25, duration: 0.8 }}
                    >
                      {/* Layer content */}
                      <motion.div 
                        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.25, duration: 0.6 }}
                      >
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4">
                          <div className="w-8 h-8 rounded-full bg-white/20" />
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-1">
                          {layer.labelAr}
                        </h3>
                        <p className="text-white/50 text-sm">
                          {layer.label}
                        </p>
                      </motion.div>

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </motion.div>

                    {/* Connector line and label */}
                    <ConnectorLine 
                      layer={layer} 
                      index={index} 
                      delay={1.2 + index * 0.35}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom info section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.8, ease: "easeOut" }}
              className="mt-16 text-center relative z-10"
            >
              {englishDescription && (
                <motion.p 
                  className="text-white/50 text-sm mb-8 max-w-lg mx-auto italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.0, duration: 0.6 }}
                >
                  {englishDescription}
                </motion.p>
              )}

              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.2, duration: 0.6 }}
              >
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
              </motion.div>
            </motion.div>
          </div>

          {/* Animation complete indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 0.8 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-sm flex flex-col items-center gap-2"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.8, duration: 0.5 }}
            >
              Explore the details above
            </motion.span>
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
  const lineLength = 140 + index * 25;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
      className={`absolute ${isLeft ? 'right-full mr-4' : 'left-full ml-4'} top-1/2 -translate-y-1/2`}
      style={{ width: lineLength }}
    >
      {/* SVG connector line with cinematic draw animation */}
      <svg 
        className="absolute inset-0 w-full h-20 overflow-visible"
        style={{ top: "-40px" }}
      >
        <defs>
          <linearGradient id={`lineGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
        </defs>
        
        {/* Main line with draw animation */}
        <motion.path
          d={isLeft 
            ? `M ${lineLength} 40 Q ${lineLength * 0.6} 40 ${lineLength * 0.4} ${20 + index * 10} L 0 ${20 + index * 10}`
            : `M 0 40 Q ${lineLength * 0.4} 40 ${lineLength * 0.6} ${20 + index * 10} L ${lineLength} ${20 + index * 10}`
          }
          stroke={`url(#lineGradient-${index})`}
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ 
            delay, 
            duration: 1.2, 
            ease: [0.65, 0, 0.35, 1]
          }}
        />
        
        {/* Glowing dot that travels along the line once */}
        <motion.circle
          r="4"
          fill="white"
          filter="url(#glow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ 
            delay, 
            duration: 1.2,
            times: [0, 0.1, 0.9, 1]
          }}
        >
          <animateMotion
            dur="1.2s"
            begin={`${delay}s`}
            fill="freeze"
            path={isLeft 
              ? `M ${lineLength} 40 Q ${lineLength * 0.6} 40 ${lineLength * 0.4} ${20 + index * 10} L 0 ${20 + index * 10}`
              : `M 0 40 Q ${lineLength * 0.4} 40 ${lineLength * 0.6} ${20 + index * 10} L ${lineLength} ${20 + index * 10}`
            }
          />
        </motion.circle>
        
        {/* End point dot */}
        <motion.circle
          cx={isLeft ? 0 : lineLength}
          cy={20 + index * 10}
          r="3"
          fill="white"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay + 1.1, duration: 0.3, ease: "backOut" }}
        />
        
        {/* Glow filter */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Text label with sequential fade-in */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 30 : -30, filter: "blur(8px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ 
          delay: delay + 0.8, 
          duration: 0.7,
          ease: "easeOut"
        }}
        className={`absolute ${isLeft ? 'right-full pr-4' : 'left-full pl-4'} top-1/2 -translate-y-1/2 whitespace-nowrap`}
      >
        <div className={`text-${isLeft ? 'right' : 'left'}`}>
          <motion.p 
            className="text-white/90 text-sm font-medium"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.9, duration: 0.4 }}
          >
            {layer.labelAr}
          </motion.p>
          <motion.p 
            className="text-white/50 text-xs"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 1.05, duration: 0.4 }}
          >
            {layer.description}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExplodedPlaceView;
