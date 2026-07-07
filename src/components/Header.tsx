import heroImage from "@/assets/faifa-hero-new.jpg";
import WeatherWidget from "./WeatherWidget";
import ButterflyAnimation from "./ButterflyAnimation";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const { t } = useLanguage();
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
            className="text-lg md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4"
            style={{ lineHeight: 1.8, textShadow: '0 2px 12px rgba(255,255,255,0.15), 0 0 4px rgba(255,255,255,0.08)' }}
          >
            {t("بوابة الجمال الطبيعي والثراء السياحي", "Gateway to Natural Beauty & Tourism Richness")}
          </h1>
          <p
            className="text-sm md:text-base lg:text-lg text-primary-foreground/80"
            style={{ fontWeight: 300, textShadow: '0 1px 6px rgba(255,255,255,0.12)' }}
          >
            {t("انزل تحت واكتشف الأماكن", "Scroll down and discover the places")}
          </p>
        </div>
      </div>

      {/* Language Toggle - bottom center of hero */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <LanguageToggle />
      </div>
    </header>
  );
};

export default Header;
