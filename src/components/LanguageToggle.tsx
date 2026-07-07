import { useEffect, useState } from "react";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { lang, toggle } = useLanguage();
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const nextLabel = lang === "ar" ? "EN" : "AR";

  return (
    <div className="relative flex flex-col items-center gap-1 pointer-events-auto" dir="ltr">
      {/* Small hint above the button — English, auto-hides after 4s */}
      <span
        className={`text-[10px] leading-none px-2 py-1 rounded-full bg-black/40 text-white/90 backdrop-blur-sm border border-white/15 whitespace-nowrap transition-all duration-500 ${
          showHint ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        Change language
      </span>
      <button
        type="button"
        onClick={toggle}
        aria-label="Toggle language"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/25 text-white text-xs font-semibold shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <Languages className="w-3.5 h-3.5" />
        <span>{nextLabel}</span>
      </button>
    </div>
  );
};

export default LanguageToggle;
