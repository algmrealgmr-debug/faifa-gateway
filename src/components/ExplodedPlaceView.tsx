import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface ExplodedPlaceViewProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  englishDescription?: string;
  mapLink: string;
  icon: React.ReactNode;
}

const ExplodedPlaceView = ({
  isOpen,
  onClose,
  title,
  description,
  englishDescription,
  mapLink,
  icon,
}: ExplodedPlaceViewProps) => {
  const isMobile = useIsMobile();

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

  // Layer configuration - simplified for mobile
  const layers = [
    { id: "bg", label: "المنظر الطبيعي", subLabel: "Landscape", yOffset: isMobile ? -60 : -100 },
    { id: "mid", label: "العمارة", subLabel: "Architecture", yOffset: 0 },
    { id: "fg", label: "التجربة", subLabel: "Experience", yOffset: isMobile ? 60 : 100 },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 bg-[hsl(220_20%_8%)] overflow-y-auto"
          style={{ pointerEvents: "auto" }}
        >
          {/* Ambient glow - lightweight */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 md:w-96 md:h-96 bg-primary/15 rounded-full blur-[80px]"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          {/* Close button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="fixed top-4 right-4 md:top-6 md:right-6 z-50"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-white rounded-full w-10 h-10 md:w-12 md:h-12"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </motion.div>

          {/* Main content - vertical stack for mobile safety */}
          <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-16 md:py-20">
            
            {/* Title section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center mb-8 md:mb-12 relative z-10"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <motion.div 
                  className="text-primary text-2xl md:text-3xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                >
                  {icon}
                </motion.div>
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight px-2">
                {title}
              </h2>
              {description && (
                <p className="text-white/70 text-sm md:text-lg max-w-sm md:max-w-md mx-auto px-2">
                  {description}
                </p>
              )}
            </motion.div>

            {/* Cinematic 3D Layers - Vertical Stack (Mobile Safe) */}
            <div 
              className="relative w-full max-w-sm md:max-w-2xl mx-auto mb-8 md:mb-12"
              style={{ pointerEvents: "none" }}
            >
              <div className="flex flex-col items-center gap-4 md:gap-6">
                {layers.map((layer, index) => (
                  <motion.div
                    key={layer.id}
                    initial={{ 
                      opacity: 0, 
                      y: layer.yOffset,
                      scale: 0.8,
                      rotateX: 15,
                    }}
                    animate={{ 
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      rotateX: 0,
                    }}
                    transition={{ 
                      delay: 0.5 + index * 0.3,
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="w-full"
                    style={{ 
                      perspective: "800px",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Layer Card */}
                    <motion.div 
                      className="relative w-full h-24 md:h-32 rounded-xl overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, hsl(152 35% ${35 + index * 8}%), hsl(220 20% 15%))`,
                        boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08)",
                      }}
                      initial={{ boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)" }}
                      animate={{ 
                        boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08)"
                      }}
                      transition={{ delay: 0.7 + index * 0.3, duration: 0.6 }}
                    >
                      {/* Card Content */}
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-between px-4 md:px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 + index * 0.3, duration: 0.5 }}
                      >
                        {/* Left: Icon circle */}
                        <div className="flex items-center gap-3 md:gap-4">
                          <motion.div 
                            className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.1 + index * 0.3, type: "spring", stiffness: 300 }}
                          >
                            <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-white/30" />
                          </motion.div>
                          
                          {/* Text */}
                          <div className="text-right md:text-left">
                            <motion.h3 
                              className="text-white font-semibold text-base md:text-lg"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.2 + index * 0.3, duration: 0.4 }}
                            >
                              {layer.label}
                            </motion.h3>
                            <motion.p 
                              className="text-white/50 text-xs md:text-sm"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.3 + index * 0.3, duration: 0.4 }}
                            >
                              {layer.subLabel}
                            </motion.p>
                          </div>
                        </div>

                        {/* Right: Layer number */}
                        <motion.div
                          className="text-white/20 text-3xl md:text-5xl font-bold"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.4 + index * 0.3, duration: 0.4 }}
                        >
                          0{index + 1}
                        </motion.div>
                      </motion.div>

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
                    </motion.div>

                    {/* Connector line between cards */}
                    {index < layers.length - 1 && (
                      <motion.div
                        className="flex justify-center py-2"
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        transition={{ delay: 1.5 + index * 0.3, duration: 0.4 }}
                        style={{ transformOrigin: "top" }}
                      >
                        <div className="w-px h-6 md:h-8 bg-gradient-to-b from-white/30 to-transparent" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* English description */}
            {englishDescription && (
              <motion.p 
                className="text-white/50 text-xs md:text-sm mb-6 md:mb-8 max-w-xs md:max-w-lg mx-auto text-center italic px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.6 }}
              >
                {englishDescription}
              </motion.p>
            )}

            {/* Action buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm md:max-w-md px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.7, duration: 0.6 }}
            >
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 md:px-8 md:py-3 rounded-full w-full sm:w-auto"
              >
                <a 
                  href={mapLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm md:text-base">Open in Maps</span>
                </a>
              </Button>

              <Button
                variant="ghost"
                onClick={scrollToMap}
                className="text-white/70 hover:text-white hover:bg-white/10 px-6 py-2.5 md:px-6 md:py-3 rounded-full w-full sm:w-auto"
              >
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm md:text-base">View on Interactive Map</span>
              </Button>
            </motion.div>
          </div>

          {/* Bottom hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 0.6 }}
            className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs md:text-sm"
          >
            Explore the details above
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExplodedPlaceView;
