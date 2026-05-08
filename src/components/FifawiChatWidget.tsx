import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GREETING: Message = {
  role: 'assistant',
  content: 'يا هلا بك في فيفاء! ⛰️ أنا فيفاوي، مساعدك الذكي. كيف أقدر أخدمك اليوم؟',
};

const FifawiChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [hidingBubble, setHidingBubble] = useState(false);
  const [bubbleCancelled, setBubbleCancelled] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inFlight = useRef(false);
  const endRef = useRef<HTMLDivElement>(null);

  // Greeting bubble: 10s delay, 6s visible
  useEffect(() => {
    const showTimer = setTimeout(() => setShowBubble(true), 10000);
    const hideTimer = setTimeout(() => {
      setHidingBubble(true);
      setTimeout(() => setShowBubble(false), 500);
    }, 16000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const handleOpen = () => {
    setOpen(true);
    setBubbleCancelled(true);
    setShowBubble(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading || inFlight.current) return;
    inFlight.current = true;
    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const busy = 'فيفاوي مشغول قليلاً الآن، فضلاً انتظر دقيقة وأعد السؤال.';
    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { messages: [...messages, userMessage] },
      });
      if (error) throw error;
      if (data?.error) {
        setMessages((p) => [...p, { role: 'assistant', content: busy }]);
      } else {
        setMessages((p) => [
          ...p,
          { role: 'assistant', content: data?.message || 'عذراً، حدث خطأ ما.' },
        ]);
      }
    } catch (e) {
      console.error('chat error:', e);
      setMessages((p) => [...p, { role: 'assistant', content: busy }]);
    } finally {
      setIsLoading(false);
      inFlight.current = false;
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Greeting bubble */}
      {showBubble && !bubbleCancelled && !open && (
        <div
          className={`fixed bottom-24 right-6 z-[9998] max-w-[280px] transition-all duration-500 ${
            hidingBubble ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="relative bg-primary text-primary-foreground rounded-2xl px-5 py-4 shadow-lg">
            <p className="text-sm leading-relaxed text-right" dir="rtl">
              يا هلا بك في فيفاء! ⛰️ أنا مساعدك الذكي، كيف أقدر أخدمك اليوم؟
            </p>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-primary transform rotate-45" />
          </div>
        </div>
      )}

      {/* Floating button */}
      {!open && (
        <button
          onClick={handleOpen}
          aria-label="فتح المحادثة مع فيفاوي"
          className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          dir="rtl"
          className="fixed bottom-6 right-6 z-[9999] w-[calc(100vw-3rem)] max-w-sm bg-card border-2 border-border/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-200"
          style={{ maxHeight: 'min(80vh, 600px)' }}
        >
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary-foreground/15 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">فيفاوي</h4>
                <p className="text-xs opacity-80">مساعدك الذكي لاستكشاف فيفاء</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg hover:bg-primary-foreground/15 transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50 min-h-[300px]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-secondary' : 'bg-primary'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <User className="w-4 h-4 text-secondary-foreground" />
                  ) : (
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : 'bg-muted text-foreground rounded-tl-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="p-3 border-t border-border/50 bg-card">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKey}
                placeholder="اكتب سؤالك..."
                disabled={isLoading}
                className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="rounded-xl w-10 h-10 bg-primary hover:bg-primary/90 shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FifawiChatWidget;