import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import AIChatWidget from "./AIChatWidget";

const FloatingChatButton = () => {
  const [open, setOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingDismissed, setGreetingDismissed] = useState(false);

  useEffect(() => {
    if (greetingDismissed) return;
    const showTimer = setTimeout(() => {
      setShowGreeting(true);
      const hideTimer = setTimeout(() => setShowGreeting(false), 4000);
      return () => clearTimeout(hideTimer);
    }, 7000);
    return () => clearTimeout(showTimer);
  }, [greetingDismissed]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const handleToggle = () => {
    setOpen((v) => !v);
    setShowGreeting(false);
    setGreetingDismissed(true);
  };

  return (
    <>
      {/* Greeting bubble */}
      {showGreeting && !open && (
        <div
          dir="rtl"
          className="fixed bottom-24 right-6 z-[9999] max-w-[260px] rounded-2xl bg-primary text-primary-foreground px-4 py-3 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300"
          style={{ fontFamily: "Tajawal, sans-serif" }}
        >
          <p className="text-sm leading-relaxed">
            مرحبا انا فيفاوي اسالني اي شي وبجاوبك😉
          </p>
          <span
            className="absolute -bottom-2 right-6 w-4 h-4 bg-primary rotate-45"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Floating button (hidden when chat open) */}
      {!open && (
        <button
          onClick={handleToggle}
          aria-label="افتح المحادثة"
          className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat modal */}
      {open && (
        <div
          dir="rtl"
          className="fixed inset-0 z-[9998] flex items-stretch sm:items-center sm:justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={handleToggle}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full h-full sm:h-[600px] sm:max-h-[85vh] sm:w-[440px] sm:rounded-2xl bg-card shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200"
          >
            <button
              onClick={handleToggle}
              aria-label="إغلاق المحادثة"
              className="absolute top-3 left-3 z-10 w-10 h-10 rounded-full bg-muted hover:bg-muted/80 text-foreground flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <AIChatWidget fullHeight />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatButton;
