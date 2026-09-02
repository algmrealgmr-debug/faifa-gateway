import VisitorCounter from "./VisitorCounter";
import ThemeToggle from "./ThemeToggle";
import ChatBarButton from "./ChatBarButton";

const CompactControlBar = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="flex items-center justify-center gap-3 md:gap-6 py-2 px-3 md:px-4 rounded-full bg-muted/60 border border-border/60 backdrop-blur-sm">
        <VisitorCounter compact />
        <div className="w-px h-8 bg-border/50 hidden sm:block" />
        <ThemeToggle compact />
        <div className="w-px h-8 bg-border/50 hidden sm:block" />
        <ChatBarButton />
      </div>
    </div>
  );
};

export default CompactControlBar;
