import heroImage from "@/assets/faifa-hero.jpg";

const Header = () => {
  return (
    <header className="relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          filter: 'brightness(0.4)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 drop-shadow-lg">
            اكتشف فيفاء
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            استمتع بالجمال الساحر لجوهرة المملكة العربية السعودية الجبلية المخفية، حيث تلتقي التقاليد العريقة بالمناظر الطبيعية الخلابة
          </p>
          <div className="mt-8 animate-float">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-primary-foreground">
              <span className="text-sm">اكتشف الجمال الطبيعي</span>
              <span className="text-accent">🏔️</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;