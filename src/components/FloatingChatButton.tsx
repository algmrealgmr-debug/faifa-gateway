import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import AIChatWidget from "./AIChatWidget";

const FloatingChatButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
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