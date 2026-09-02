import { createContext, useContext, useState, ReactNode } from "react";

interface ChatOpenContextValue {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ChatOpenContext = createContext<ChatOpenContextValue>({
  open: false,
  setOpen: () => {},
});

export const ChatOpenProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <ChatOpenContext.Provider value={{ open, setOpen }}>
      {children}
    </ChatOpenContext.Provider>
  );
};

export const useChatOpen = () => useContext(ChatOpenContext);
