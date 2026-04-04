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
            className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg leading-relaxed"
            style={{ fontFamily: "'Amiri', serif", lineHeight: 1.8 }}
          >
            ترا الجبل هذا أحنّ من إنه يخليك ترجع مثل ما جيت
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;