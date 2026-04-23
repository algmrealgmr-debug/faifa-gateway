import { useState, useEffect } from "react";

const ChatbaseBubble = () => {
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 2000);
    const hideTimer = setTimeout(() => {
      setHiding(true);
      setTimeout(() => setVisible(false), 500);
    }, 8000); // 2s delay + 6s visible

    // Hide on chatbase icon click
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('#chatbase-bubble-button, iframe[title*="chatbase"], [id*="chatbase"]')) {
        setHiding(true);
        setTimeout(() => setVisible(false), 300);
      }
    };
    document.addEventListener('click', handleClick, true);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-24 right-6 z-[9998] max-w-[280px] transition-all duration-500 ${
        hiding ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
      }`}
      style={{ fontFamily: "'Thmanyah', sans-serif" }}
    >
      <div className="relative bg-white text-foreground rounded-2xl px-5 py-4 shadow-lg border border-border/50">
        <p className="text-sm leading-relaxed text-right" dir="rtl">
          يا هلا بك في فيفاء! ⛰️ أنا مساعدك الذكي، كيف أقدر أخدمك اليوم؟
        </p>
        {/* Caret arrow pointing to bottom-right (toward chat icon) */}
        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-border/50 transform rotate-45" />
      </div>
    </div>
  );
};

export default ChatbaseBubble;