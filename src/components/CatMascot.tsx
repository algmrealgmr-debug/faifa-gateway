import { useState, useEffect } from "react";

interface CatMascotProps {
  targetPosition?: { x: number; y: number };
}

const CatMascot = ({ targetPosition }: CatMascotProps) => {
  const [headRotation, setHeadRotation] = useState(0);
  const [eyeDirection, setEyeDirection] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!targetPosition) return;

    // Calculate angle to target (butterfly position)
    const catElement = document.getElementById("cat-mascot");
    if (!catElement) return;

    const catRect = catElement.getBoundingClientRect();
    const catCenterX = catRect.left + catRect.width / 2;
    const catCenterY = catRect.top + catRect.height / 3;

    const dx = targetPosition.x - catCenterX;
    const dy = targetPosition.y - catCenterY;
    
    // Calculate head rotation (limited range)
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const clampedRotation = Math.max(-30, Math.min(30, angle));
    setHeadRotation(clampedRotation);

    // Calculate eye direction
    const distance = Math.sqrt(dx * dx + dy * dy);
    const normalizedX = distance > 0 ? (dx / distance) * 2 : 0;
    const normalizedY = distance > 0 ? (dy / distance) * 1.5 : 0;
    setEyeDirection({ x: normalizedX, y: normalizedY });
  }, [targetPosition]);

  return (
    <div
      id="cat-mascot"
      className="absolute bottom-4 right-8 md:bottom-8 md:right-16 z-20"
    >
      <svg
        width="80"
        height="100"
        viewBox="0 0 80 100"
        className="drop-shadow-xl"
      >
        {/* Body */}
        <ellipse cx="40" cy="75" rx="25" ry="20" fill="#8B7355" />
        
        {/* Tail */}
        <path
          d="M60 80 Q80 70 75 55 Q70 45 65 50"
          stroke="#8B7355"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Head group with rotation */}
        <g
          style={{
            transformOrigin: "40px 45px",
            transform: `rotate(${headRotation}deg)`,
            transition: "transform 0.15s ease-out"
          }}
        >
          {/* Head */}
          <ellipse cx="40" cy="40" rx="22" ry="20" fill="#A08060" />
          
          {/* Left ear */}
          <polygon points="22,30 18,8 32,22" fill="#A08060" />
          <polygon points="24,26 22,14 30,22" fill="#FFB6C1" />
          
          {/* Right ear */}
          <polygon points="58,30 62,8 48,22" fill="#A08060" />
          <polygon points="56,26 58,14 50,22" fill="#FFB6C1" />
          
          {/* Face */}
          <ellipse cx="40" cy="45" rx="15" ry="12" fill="#C4A882" />
          
          {/* Left eye */}
          <ellipse cx="32" cy="38" rx="5" ry="6" fill="white" />
          <circle
            cx={32 + eyeDirection.x}
            cy={38 + eyeDirection.y}
            r="3"
            fill="#2d1b0e"
            style={{ transition: "cx 0.1s, cy 0.1s" }}
          />
          <circle
            cx={33 + eyeDirection.x * 0.5}
            cy={37 + eyeDirection.y * 0.5}
            r="1"
            fill="white"
          />
          
          {/* Right eye */}
          <ellipse cx="48" cy="38" rx="5" ry="6" fill="white" />
          <circle
            cx={48 + eyeDirection.x}
            cy={38 + eyeDirection.y}
            r="3"
            fill="#2d1b0e"
            style={{ transition: "cx 0.1s, cy 0.1s" }}
          />
          <circle
            cx={49 + eyeDirection.x * 0.5}
            cy={37 + eyeDirection.y * 0.5}
            r="1"
            fill="white"
          />
          
          {/* Nose */}
          <ellipse cx="40" cy="48" rx="3" ry="2" fill="#FFB6C1" />
          
          {/* Mouth */}
          <path d="M36 52 Q40 56 44 52" stroke="#2d1b0e" strokeWidth="1.5" fill="none" />
          
          {/* Whiskers */}
          <line x1="25" y1="46" x2="12" y2="44" stroke="#2d1b0e" strokeWidth="1" />
          <line x1="25" y1="49" x2="12" y2="50" stroke="#2d1b0e" strokeWidth="1" />
          <line x1="25" y1="52" x2="12" y2="56" stroke="#2d1b0e" strokeWidth="1" />
          <line x1="55" y1="46" x2="68" y2="44" stroke="#2d1b0e" strokeWidth="1" />
          <line x1="55" y1="49" x2="68" y2="50" stroke="#2d1b0e" strokeWidth="1" />
          <line x1="55" y1="52" x2="68" y2="56" stroke="#2d1b0e" strokeWidth="1" />
        </g>
        
        {/* Front paws */}
        <ellipse cx="28" cy="90" rx="8" ry="5" fill="#A08060" />
        <ellipse cx="52" cy="90" rx="8" ry="5" fill="#A08060" />
      </svg>
    </div>
  );
};

export default CatMascot;
