import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-dismiss after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleExitComplete = () => {
    onComplete();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(152 35% 12%) 0%, hsl(152 35% 8%) 50%, hsl(0 0% 5%) 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary/30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0, 1.5, 0],
                  y: [-20, -100],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* 3D Mountain layers - lightweight CSS 3D */}
          <div className="absolute inset-0" style={{ perspective: "1000px" }}>
            {/* Back mountain layer */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[40%]"
              style={{
                background: "linear-gradient(180deg, hsl(152 25% 20%) 0%, hsl(152 30% 15%) 100%)",
                clipPath: "polygon(0% 100%, 15% 40%, 30% 70%, 50% 30%, 70% 60%, 85% 35%, 100% 100%)",
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, translateZ: -200, translateY: 100 }}
              animate={{ opacity: 0.6, translateZ: -100, translateY: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            />

            {/* Middle mountain layer */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[35%]"
              style={{
                background: "linear-gradient(180deg, hsl(152 30% 25%) 0%, hsl(152 35% 18%) 100%)",
                clipPath: "polygon(0% 100%, 10% 50%, 25% 75%, 45% 35%, 60% 65%, 80% 40%, 100% 100%)",
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, translateZ: -100, translateY: 80 }}
              animate={{ opacity: 0.8, translateZ: -50, translateY: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            />

            {/* Front mountain layer */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[25%]"
              style={{
                background: "linear-gradient(180deg, hsl(152 35% 30%) 0%, hsl(152 40% 22%) 100%)",
                clipPath: "polygon(0% 100%, 20% 60%, 40% 80%, 55% 50%, 75% 70%, 90% 55%, 100% 100%)",
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, translateZ: 0, translateY: 60 }}
              animate={{ opacity: 1, translateZ: 0, translateY: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            />
          </div>

          {/* Glowing orb behind text */}
          <motion.div
            className="absolute w-64 h-64 rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(152 35% 45% / 0.3) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.2 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          />

          {/* Main content */}
          <div className="relative z-10 text-center px-6">
            {/* Arabic title with 3D effect */}
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              style={{
                textShadow: "0 4px 20px hsl(152 35% 45% / 0.5), 0 8px 40px hsl(0 0% 0% / 0.5)",
              }}
              initial={{ opacity: 0, y: 30, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              اكتشف جمال فيفاء
            </motion.h1>

            {/* English subtitle */}
            <motion.p
              className="text-lg md:text-xl text-white/80 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              Discover the beauty of Faifa
            </motion.p>

            {/* Tagline */}
            <motion.p
              className="text-sm md:text-base text-primary-foreground/60 tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
            >
              Your Interactive Tourism Guide
            </motion.p>

            {/* Animated line */}
            <motion.div
              className="mx-auto mt-6 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 200, opacity: 1 }}
              transition={{ duration: 1, delay: 1.3, ease: "easeOut" }}
            />
          </div>

          {/* Loading indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary/60"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
