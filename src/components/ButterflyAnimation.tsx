import { useEffect, useState } from "react";

const ButterflyAnimation = ({ onPositionChange }: { onPositionChange?: (x: number, y: number) => void }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const butterfly = document.getElementById('butterfly');
      if (butterfly && onPositionChange) {
        const rect = butterfly.getBoundingClientRect();
        onPositionChange(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    }, 50);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onPositionChange]);

  if (!visible) return null;

  return (
    <div
      id="butterfly"
      className="fixed z-50 pointer-events-none animate-butterfly-flight"
      style={{
        top: '30%',
        right: '-50px',
      }}
    >
      <div className="relative">
        {/* Left Wing */}
        <div className="absolute -left-3 top-0 w-6 h-8 bg-gradient-to-br from-amber-300 via-orange-400 to-amber-500 rounded-full animate-wing-left origin-right opacity-90" 
          style={{ transform: 'rotate(-20deg)' }} 
        />
        <div className="absolute -left-2 top-1 w-4 h-5 bg-gradient-to-br from-amber-200 via-yellow-300 to-orange-300 rounded-full animate-wing-left origin-right opacity-80" 
          style={{ transform: 'rotate(-15deg)' }} 
        />
        
        {/* Right Wing */}
        <div className="absolute -right-3 top-0 w-6 h-8 bg-gradient-to-bl from-amber-300 via-orange-400 to-amber-500 rounded-full animate-wing-right origin-left opacity-90" 
          style={{ transform: 'rotate(20deg)' }} 
        />
        <div className="absolute -right-2 top-1 w-4 h-5 bg-gradient-to-bl from-amber-200 via-yellow-300 to-orange-300 rounded-full animate-wing-right origin-left opacity-80" 
          style={{ transform: 'rotate(15deg)' }} 
        />
        
        {/* Body */}
        <div className="relative z-10 w-1.5 h-6 bg-gradient-to-b from-amber-800 to-amber-900 rounded-full mx-auto" />
        
        {/* Head */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-800 rounded-full" />
        
        {/* Antennae */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-amber-700 rounded-full rotate-[-20deg] origin-bottom" />
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-amber-700 rounded-full rotate-[20deg] origin-bottom" />
      </div>
    </div>
  );
};

export default ButterflyAnimation;
