import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AIChatWidget from "@/components/AIChatWidget";

const Chat = () => {
  return (
    <div dir="rtl" className="fixed inset-0 flex flex-col bg-background">
      <header className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card shrink-0">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          aria-label="العودة للرئيسية"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الرئيسية</span>
        </Link>
        <h1 className="text-base font-semibold text-foreground">فيفاوي - المساعد الذكي</h1>
        <div className="w-16" />
      </header>
      <main className="flex-1 min-h-0">
        <div className="h-full max-w-3xl mx-auto">
          <AIChatWidget fullHeight />
        </div>
      </main>
    </div>
  );
};

export default Chat;