import { Code, Instagram } from "lucide-react";

const DeveloperSection = () => {
  return (
    <section className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-8 text-center space-y-6" id="developer">
      <div className="flex items-center justify-center gap-3">
        <Code className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">مطور الموقع</h2>
      </div>
      
      <div className="space-y-4">
        <div className="text-xl font-semibold text-primary">روح</div>
        <a 
          href="https://www.instagram.com/wu3x" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-hero text-primary-foreground rounded-full hover:scale-105 transition-all duration-300 hover:shadow-glow"
          aria-label="زيارة حساب المطور على إنستقرام"
        >
          <Instagram className="w-5 h-5" />
          <span>wu3x</span>
        </a>
      </div>
    </section>
  );
};

export default DeveloperSection;