import { useEffect } from "react";
import AIChatWidget from "@/components/AIChatWidget";

const Chat = () => {
  useEffect(() => {
    document.title = "فيفاوي | شات فيفاء";
  }, []);

  return (
    <div dir="rtl" className="fixed inset-0 z-[9999] w-screen h-screen min-h-[100dvh] overflow-hidden bg-background">
      <AIChatWidget fullHeight />
    </div>
  );
};

export default Chat;