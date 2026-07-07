import { Hotel, Trees, Coffee } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [introActive, setIntroActive] = useState(false);
  const [glowIndex, setGlowIndex] = useState(-1);
  const [showGuideText, setShowGuideText] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const triggerIntro = useCallback(() => {
    const alreadyShown = sessionStorage.getItem('nav-intro-shown');
    if (alreadyShown) return;
    sessionStorage.setItem('nav-intro-shown', 'true');

    setIntroActive(true);
    setShowGuideText(true);
    window.dispatchEvent(new CustomEvent('nav-intro-trigger'));

    // Sequential glow: 0 -> 1 -> 2, each ~600ms
    setTimeout(() => setGlowIndex(0), 200);
    setTimeout(() => setGlowIndex(1), 800);
    setTimeout(() => setGlowIndex(2), 1400);
    setTimeout(() => setGlowIndex(-1), 2000);

    // End intro after ~2.5s
    setTimeout(() => {
      setIntroActive(false);
      setShowGuideText(false);
    }, 2500);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
      if (scrolled) {
        triggerIntro();
      }
    };
    const handleTouch = () => {
      triggerIntro();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchstart", handleTouch, { passive: true, once: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, [triggerIntro]);

  // Track active section based on scroll position
  useEffect(() => {
    const sectionIds = ["hotels", "parks", "cafes"];
    const handleScroll = () => {
      let current: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    {
      id: "hotels",
      label: t("الفنادق", "Hotels"),
      icon: Hotel,
      ariaLabel: t("الانتقال إلى قسم الفنادق", "Go to Hotels section")
    },
    {
      id: "parks", 
      label: t("المنتزهات", "Parks"),
      icon: Trees,
      ariaLabel: t("الانتقال إلى قسم المنتزهات", "Go to Parks section")
    },
    {
      id: "cafes",
      label: t("الكافيهات", "Cafés"),
      icon: Coffee,
      ariaLabel: t("الانتقال إلى قسم الكافيهات", "Go to Cafés section")
    }
  ];

  return (
    <nav className={`bg-mountain text-mountain-foreground sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'shadow-lg shadow-primary/10 border-b border-primary/20' : 'shadow-lg'}`}>
      <div className="container mx-auto px-6">
        <ul className="flex justify-center items-center flex-wrap gap-6 py-4">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            const isGlowing = glowIndex === index;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 hover:bg-accent hover:text-accent-foreground text-lg ${isActive ? 'bg-accent text-accent-foreground font-bold' : 'font-medium'} ${isGlowing ? 'animate-nav-pulse ring-2 ring-primary/50' : ''}`}
                  aria-label={item.ariaLabel}
                >
                  <IconComponent className={`w-5 h-5 transition-transform duration-500 ${isGlowing ? 'animate-icon-bounce' : ''}`} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
        {/* Guide text */}
        <div className={`text-center pb-3 transition-all duration-500 ${showGuideText ? 'opacity-100 max-h-10' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          <span className="text-sm text-primary-foreground/70">{t("اختر ما يناسبك", "Choose what suits you")}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;