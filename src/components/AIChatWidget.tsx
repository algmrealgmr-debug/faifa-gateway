import { useState, useRef, useEffect } from 'react';
import { Search, Send, Bot, User, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatWidgetProps {
  fullHeight?: boolean;
}

const AIChatWidget = ({ fullHeight = false }: AIChatWidgetProps) => {
  const [isExpanded, setIsExpanded] = useState(fullHeight);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'أنا فيفاوي مساعدك الإلكتروني.. كيف أقدر أخدمك؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const isRequestInFlight = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isExpanded || fullHeight) {
      scrollToBottom();
    }
  }, [messages, isExpanded, fullHeight]);

  const sendMessage = async () => {
    // Prevent multiple requests with both state and ref check
    if (!input.trim() || isLoading || isRequestInFlight.current) return;

    isRequestInFlight.current = true;
    const userMessage: Message = { role: 'user', content: input.trim() };
    
    // Expand if not already
    if (!isExpanded) {
      setIsExpanded(true);
    }
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const busyMessage = 'فيفاوي مشغول قليلاً الآن، فضلاً انتظر دقيقة وأعد السؤال.';

    const maxAttempts = 3;
    const baseDelayMs = 900;

    try {
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        const { data, error } = await supabase.functions.invoke('chat', {
          body: { messages: [...messages, userMessage] },
        });

        // If the backend surfaces a rate-limit or connection issue, show the required message.
        if (error) {
          console.error('Chat invoke error:', error);
          throw error;
        }

        if (data?.error === 'RATE_LIMIT') {
          if (attempt < maxAttempts) {
            setIsRetrying(true);
            const jitter = Math.floor(Math.random() * 250);
            const delay = baseDelayMs * Math.pow(2, attempt - 1) + jitter;
            console.warn(`Rate limited; retrying in ${delay}ms (attempt ${attempt}/${maxAttempts})`);
            await new Promise((r) => setTimeout(r, delay));
            continue;
          }

          // Retries exhausted in UI: show the required final busy message.
          setIsRetrying(false);
          setMessages((prev) => [...prev, { role: 'assistant', content: busyMessage }]);
          return;
        }

        setIsRetrying(false);
        const assistantMessage: Message = {
          role: 'assistant',
          content: data?.message || 'عذراً، حدث خطأ ما.',
        };
        setMessages((prev) => [...prev, assistantMessage]);
        return;
      }

      // Should never happen, but keep UX consistent.
      setIsRetrying(false);
      setMessages((prev) => [...prev, { role: 'assistant', content: busyMessage }]);
    } catch (error: any) {
      console.error('Error sending message:', error);

      // Required UX: show this exact message for 429 rate limit OR any connection error.
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: busyMessage,
        },
      ]);
    } finally {
      setIsRetrying(false);
      setIsLoading(false);
      isRequestInFlight.current = false;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClose = () => {
    if (!fullHeight) setIsExpanded(false);
  };

  if (fullHeight) {
    return (
      <div dir="rtl" className="flex flex-col h-full bg-card">
        {/* Header */}
        <div className="flex items-center justify-center px-5 py-4 border-b border-border/50 bg-muted/30 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="text-center">
              <h4 className="text-base font-semibold text-foreground">فيفاوي</h4>
              <p className="text-xs text-muted-foreground">مساعدك الذكي</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-secondary' : 'bg-primary'
              }`}>
                {msg.role === 'user' ? (
                  <User className="w-4 h-4 text-secondary-foreground" />
                ) : (
                  <Bot className="w-4 h-4 text-primary-foreground" />
                )}
              </div>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-tr-sm'
                  : 'bg-muted text-foreground rounded-tl-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}

          {isRetrying && (
            <div className="text-xs text-muted-foreground text-center">
              Service is busy, retrying...
            </div>
          )}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Persistent input */}
        <div className="border-t border-border/50 bg-card p-3 shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="اكتب رسالتك..."
              className="flex-1 bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="rounded-xl w-12 h-12 bg-primary hover:bg-primary/90 shrink-0"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search Bar */}
      <div className="relative">
        <div className={`relative bg-card border-2 border-border/50 rounded-2xl shadow-lg transition-all duration-300 hover:border-primary/30 hover:shadow-xl ${isExpanded ? 'rounded-b-none border-b-0' : ''}`}>
          <div className="flex items-center gap-3 px-5 py-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => !isExpanded && messages.length > 1 && setIsExpanded(true)}
              placeholder="اسأل الذكاء الاصطناعي..."
              className="flex-1 bg-transparent text-foreground text-base placeholder:text-muted-foreground focus:outline-none"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="rounded-xl w-10 h-10 bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          {/* Helper Text */}
          {!isExpanded && (
            <div className="px-5 pb-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Bot className="w-3.5 h-3.5" />
              <span>مساعدك الذكي "فيفاوي" جاهز للإجابة على استفساراتك</span>
            </div>
          )}
        </div>

        {/* Expanded Chat Panel */}
        {isExpanded && (
          <div className="bg-card border-2 border-t-0 border-border/50 rounded-b-2xl shadow-lg overflow-hidden animate-in slide-in-from-top-2 duration-200">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border/50 bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">فيفاوي</h4>
                  <p className="text-xs text-muted-foreground">مساعدك الذكي</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="إغلاق المحادثة"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-4 bg-background/50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-secondary' : 'bg-primary'
                  }`}>
                    {msg.role === 'user' ? (
                      <User className="w-4 h-4 text-secondary-foreground" />
                    ) : (
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                      : 'bg-muted text-foreground rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {isRetrying && (
                <div className="text-xs text-muted-foreground text-center">
                  Service is busy, retrying...
                </div>
              )}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChatWidget;
