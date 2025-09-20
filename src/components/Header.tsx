import heroImage from "@/assets/faifa-hero-new.jpg";

const Header = () => {
  return (
    <header 
      className="main-hero relative overflow-hidden min-h-screen"
      style={{
        '--hero-bg-image': `url(${heroImage})`,
      } as React.CSSProperties & { '--hero-bg-image': string }}
    >
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            اكتشف فيفاء
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            استمتع بالجمال الساحر لجوهرة المملكة العربية السعودية الجبلية المخفية، حيث تلتقي التقاليد العريقة بالمناظر الطبيعية الخلابة
          </p>
          <div className="mt-8 animate-float">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white">
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