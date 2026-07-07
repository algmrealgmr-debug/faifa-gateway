import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type Lang = "ar" | "en";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (ar: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Always start in Arabic on first load per requirement.
  const [lang, setLangState] = useState<Lang>("ar");

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof document !== "undefined") {
      document.documentElement.lang = l;
      document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "ar" ? "en" : "ar");
  }, [lang, setLang]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang]);

  const t = useCallback(
    (ar: string, en: string) => (lang === "en" ? en : ar),
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, toggle, t }), [lang, setLang, toggle, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};
