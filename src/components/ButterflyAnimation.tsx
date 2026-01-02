import { useEffect, useState, useCallback } from "react";

interface Position {
  x: number;
  y: number;
}

interface ButterflyAnimationProps {
  onPositionChange?: (position: Position) => void;
}

const ButterflyAnimation = ({ onPositionChange }: ButterflyAnimationProps) => {
  const [position, setPosition] = useState<Position>({ x: -50, y: 100 });
  const [visible, setVisible] = useState(true);
  const [wingPhase, setWingPhase] = useState(0);

  const updatePosition = useCallback((newPos: Position) => {
    setPosition(newPos);
    onPositionChange?.(newPos);
  }, [onPositionChange]);

  useEffect(() => {
    // Wing flapping animation
    const wingInterval = setInterval(() => {
      setWingPhase((prev) => (prev + 1) % 4);
    }, 100);

    // Flight path animation
    const duration = 6000;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;
      
      if (progress >= 1) {
        setVisible(false);
        return;
      }
      
      // Create a curved flight path across the screen
      const screenWidth = window.innerWidth;
      const x = -50 + (screenWidth + 100) * progress;
      
      // Sinusoidal vertical movement for natural flight
      const baseY = 80 + Math.sin(progress * Math.PI) * 60;
      const flutter = Math.sin(progress * 20) * 15;
      const y = baseY + flutter;
      
      updatePosition({ x, y });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
    
    return () => {
      clearInterval(wingInterval);
    };
  }, [updatePosition]);

  if (!visible) return null;

  const wingScale = [1, 0.7, 0.4, 0.7][wingPhase];

  return (
    <div
      className="fixed z-50 pointer-events-none transition-opacity duration-500"
      style={{
        left: position.x,
        top: position.y,
        opacity: visible ? 1 : 0,
      }}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        className="drop-shadow-lg"
      >
        {/* Left wing */}
        <ellipse
          cx="15"
          cy="20"
          rx={8 * wingScale}
          ry="12"
          fill="url(#wingGradient)"
          opacity="0.9"
          transform={`rotate(-15 15 20)`}
        />
        {/* Right wing */}
        <ellipse
          cx="25"
          cy="20"
          rx={8 * wingScale}
          ry="12"
          fill="url(#wingGradient)"
          opacity="0.9"
          transform={`rotate(15 25 20)`}
        />
        {/* Body */}
        <ellipse cx="20" cy="20" rx="2" ry="8" fill="#2d1b0e" />
        {/* Head */}
        <circle cx="20" cy="10" r="3" fill="#2d1b0e" />
        {/* Antennae */}
        <path d="M18 8 Q16 4 14 3" stroke="#2d1b0e" strokeWidth="1" fill="none" />
        <path d="M22 8 Q24 4 26 3" stroke="#2d1b0e" strokeWidth="1" fill="none" />
        
        <defs>
          <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default ButterflyAnimation;
