import heroImage from "@/assets/faifa-hero-new.jpg";
import WeatherWidget from "./WeatherWidget";
import ButterflyAnimation from "./ButterflyAnimation";

const Header = () => {
  return (
    <header 
      className="main-hero relative overflow-hidden min-h-[75vh] md:min-h-screen"
      style={{
        '--hero-bg-image': `url(${heroImage})`,
      } as React.CSSProperties & { '--hero-bg-image': string }}
    >
      {/* Butterfly Animation */}
      <ButterflyAnimation />

      {/* Weather Widget - Top Right */}
      <div className="absolute top-6 left-6 z-20">
        <WeatherWidget />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-16 md:py-20 text-center min-h-[75vh] md:min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1
            className="text-[0.85rem] md:text-2xl lg:text-3xl font-bold text-primary-foreground whitespace-nowrap mb-4"
            style={{ fontFamily: "'Amiri', serif", lineHeight: 1.9, textShadow: '0 2px 12px rgba(255,255,255,0.15), 0 0 4px rgba(255,255,255,0.08)' }}
          >
            ترا الجبل هذا أحنّ من إنه يخليك ترجع مثل ما جيت
          </h1>
          <p
            className="text-sm md:text-base lg:text-lg text-primary-foreground/80"
            style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 300, textShadow: '0 1px 6px rgba(255,255,255,0.12)' }}
          >
            انزل تحت واكتشف الأماكن
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;