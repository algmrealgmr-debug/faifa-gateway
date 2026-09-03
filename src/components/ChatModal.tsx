import { useEffect } from "react";
import { X } from "lucide-react";
import AIChatWidget from "./AIChatWidget";
import { useChatOpen } from "@/contexts/ChatOpenContext";

const ChatModal = () => {
  const { open, setOpen } = useChatOpen();

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[9998] flex items-stretch sm:items-center sm:justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full sm:h-[600px] sm:max-h-[85vh] sm:w-[440px] sm:rounded-2xl bg-card shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200"
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="إغلاق المحادثة"
          className="absolute top-3 left-3 z-10 w-10 h-10 rounded-full bg-muted hover:bg-muted/80 text-foreground flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <AIChatWidget fullHeight />
      </div>
    </div>
  );
};

export default ChatModal;
