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

      {/* Floating button */}
      <button
        onClick={handleToggle}
        aria-label={open ? "إغلاق المحادثة" : "افتح المحادثة"}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          dir="rtl"
          className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 z-[9998] sm:w-[400px] max-w-[calc(100vw-2rem)] animate-in slide-in-from-bottom-4 duration-200"
        >
          <AIChatWidget />
        </div>
      )}
    </>
  );
};

export default FloatingChatButton;
