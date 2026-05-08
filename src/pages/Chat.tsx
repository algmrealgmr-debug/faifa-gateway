import AIChatWidget from "@/components/AIChatWidget";

const Chat = () => {
  return (
    <div dir="rtl" className="fixed inset-0 w-screen h-screen bg-background">
      <AIChatWidget fullHeight />
    </div>
  );
};

export default Chat;