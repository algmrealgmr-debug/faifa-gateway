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
            className="text-xl md:text-3xl lg:text-4xl font-bold text-primary-foreground leading-relaxed"
            style={{ fontFamily: "'Amiri', serif", lineHeight: 1.9, textShadow: '0 1px 8px rgba(255,255,248,0.18), 0 0 2px rgba(255,255,240,0.10)' }}
          >
            ترا الجبل هذا أحنّ من إنه يخليك ترجع مثل ما جيت
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;