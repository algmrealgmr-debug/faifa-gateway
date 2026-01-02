import { useState } from "react";
import heroImage from "@/assets/faifa-hero-new.jpg";
import WeatherWidget from "./WeatherWidget";
import ButterflyAnimation from "./ButterflyAnimation";
import CatMascot from "./CatMascot";

const Header = () => {
  const [butterflyPos, setButterflyPos] = useState({ x: 0, y: 0 });
  const [isTracking, setIsTracking] = useState(true);

  const handleButterflyPosition = (x: number, y: number) => {
    setButterflyPos({ x, y });
  };

  // Stop tracking after butterfly fades
  setTimeout(() => setIsTracking(false), 4000);

  return (
    <header 
      className="main-hero relative overflow-hidden min-h-[75vh] md:min-h-screen"
      style={{
        '--hero-bg-image': `url(${heroImage})`,
      } as React.CSSProperties & { '--hero-bg-image': string }}
    >
      {/* Butterfly Animation */}
      <ButterflyAnimation onPositionChange={handleButterflyPosition} />
      
      {/* Cat Mascot */}
      <CatMascot 
        butterflyX={butterflyPos.x} 
        butterflyY={butterflyPos.y} 
        isTracking={isTracking} 
      />

      {/* Weather Widget - Top Right */}
      <div className="absolute top-6 left-6 z-20">
        <WeatherWidget />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-16 md:py-20 text-center min-h-[75vh] md:min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            اكتشف فيفاء
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            استمتع بالجمال الساحر لجوهرة المملكة العربية السعودية الجبلية المخفية، حيث تلتقي التقاليد العريقة بالمناظر الطبيعية الخلابة
          </p>
          <div className="mt-8 animate-float">
          <div className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white">
              <span className="text-sm font-medium">ابدأ الرحلة</span>
              <span className="text-accent">🏔️</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;