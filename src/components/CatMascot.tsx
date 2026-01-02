import { useEffect, useState, useRef } from "react";

interface CatMascotProps {
  butterflyX: number;
  butterflyY: number;
  isTracking: boolean;
}

const CatMascot = ({ butterflyX, butterflyY, isTracking }: CatMascotProps) => {
  const catRef = useRef<HTMLDivElement>(null);
  const [headRotation, setHeadRotation] = useState(0);

  useEffect(() => {
    if (!isTracking || !catRef.current) {
      setHeadRotation(0);
      return;
    }

    const catRect = catRef.current.getBoundingClientRect();
    const catCenterX = catRect.left + catRect.width / 2;
    const catCenterY = catRect.top;

    const deltaX = butterflyX - catCenterX;
    const deltaY = butterflyY - catCenterY;
    
    // Calculate angle and limit rotation
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    angle = Math.max(-45, Math.min(45, angle + 90));
    
    setHeadRotation(angle);
  }, [butterflyX, butterflyY, isTracking]);

  return (
    <div 
      ref={catRef}
      className="absolute bottom-8 left-8 md:left-16 z-20"
    >
      {/* Cat Container */}
      <div className="relative w-16 h-20 md:w-20 md:h-24">
        {/* Body */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-10 md:w-14 md:h-12 bg-gradient-to-b from-gray-600 to-gray-700 rounded-t-full rounded-b-[40%]" />
        
        {/* Tail */}
        <div className="absolute bottom-2 -right-2 md:-right-4 w-8 md:w-10 h-3 bg-gray-600 rounded-full origin-left animate-tail-wag" 
          style={{ transform: 'rotate(-20deg)' }} 
        />
        
        {/* Head - follows butterfly */}
        <div 
          className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 transition-transform duration-150 ease-out origin-bottom"
          style={{ transform: `translateX(-50%) rotate(${headRotation * 0.3}deg)` }}
        >
          {/* Head base */}
          <div className="relative w-10 h-9 md:w-12 md:h-10 bg-gradient-to-b from-gray-500 to-gray-600 rounded-full">
            {/* Ears */}
            <div className="absolute -top-2 left-1 w-3 h-4 md:w-4 md:h-5 bg-gray-500 rounded-t-full rotate-[-15deg]">
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-2 bg-pink-300 rounded-t-full" />
            </div>
            <div className="absolute -top-2 right-1 w-3 h-4 md:w-4 md:h-5 bg-gray-500 rounded-t-full rotate-[15deg]">
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-2 bg-pink-300 rounded-t-full" />
            </div>
            
            {/* Eyes - looking up when tracking */}
            <div className="absolute top-2 left-2 w-2.5 h-3 md:w-3 md:h-3.5 bg-white rounded-full overflow-hidden">
              <div 
                className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-amber-500 rounded-full transition-all duration-150"
                style={{ 
                  top: isTracking ? '0px' : '50%',
                  left: isTracking ? `${50 + headRotation * 0.5}%` : '50%',
                  transform: 'translate(-50%, 0)'
                }}
              >
                <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-white rounded-full" />
              </div>
            </div>
            <div className="absolute top-2 right-2 w-2.5 h-3 md:w-3 md:h-3.5 bg-white rounded-full overflow-hidden">
              <div 
                className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-amber-500 rounded-full transition-all duration-150"
                style={{ 
                  top: isTracking ? '0px' : '50%',
                  left: isTracking ? `${50 + headRotation * 0.5}%` : '50%',
                  transform: 'translate(-50%, 0)'
                }}
              >
                <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-white rounded-full" />
              </div>
            </div>
            
            {/* Nose */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-2 h-1.5 bg-pink-400 rounded-full" />
            
            {/* Whiskers */}
            <div className="absolute bottom-3 left-0 w-3 h-0.5 bg-gray-400 rounded-full rotate-[-10deg]" />
            <div className="absolute bottom-2 left-0 w-3 h-0.5 bg-gray-400 rounded-full" />
            <div className="absolute bottom-3 right-0 w-3 h-0.5 bg-gray-400 rounded-full rotate-[10deg]" />
            <div className="absolute bottom-2 right-0 w-3 h-0.5 bg-gray-400 rounded-full" />
          </div>
        </div>
        
        {/* Front paws */}
        <div className="absolute bottom-0 left-2 w-3 h-4 md:w-4 md:h-5 bg-gray-600 rounded-t-lg rounded-b-full" />
        <div className="absolute bottom-0 right-2 w-3 h-4 md:w-4 md:h-5 bg-gray-600 rounded-t-lg rounded-b-full" />
      </div>
    </div>
  );
};

export default CatMascot;
