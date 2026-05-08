import { useEffect } from "react";
import AIChatWidget from "@/components/AIChatWidget";

const FullScreenChat = () => {
  useEffect(() => {
    document.title = "فيفاوي | شات فيفاء";
  }, []);

  return (
    <div dir="rtl" className="fixed inset-0 z-[9999] h-[100dvh] w-screen overflow-hidden bg-background">
      <AIChatWidget fullHeight />
    </div>
  );
};

export default FullScreenChat;