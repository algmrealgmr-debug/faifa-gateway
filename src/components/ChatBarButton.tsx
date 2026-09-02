import { Bot } from "lucide-react";
import { useChatOpen } from "@/contexts/ChatOpenContext";
import { useLanguage } from "@/contexts/LanguageContext";

const ChatBarButton = () => {
  const { setOpen } = useChatOpen();
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[10px] leading-none text-muted-foreground/60 tracking-wide">
        {t("مساعدك الذكي", "AI Assistant")}
      </span>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("افتح المحادثة", "Open chat")}
        className="w-9 h-9 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        <Bot className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ChatBarButton;
