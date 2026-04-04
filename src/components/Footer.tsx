import { Heart } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      name: "تويتر",
      icon: "🐦",
      href: "#",
      ariaLabel: "زيارة حساب تويتر"
    },
    {
      name: "إنستقرام", 
      icon: "📷",
      href: "#",
      ariaLabel: "زيارة حساب إنستقرام"
    },
    {
      name: "سناب شات",
      icon: "👻", 
      href: "#",
      ariaLabel: "زيارة حساب سناب شات"
    },
    {
      name: "تيك توك",
      icon: "🎵",
      href: "#",
      ariaLabel: "زيارة حساب تيك توك"
    }
  ];

  return (
    <footer className="bg-gradient-hero text-primary-foreground mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center space-y-8">
          {/* Main Title */}
          <div className="max-w-2xl mx-auto space-y-2" style={{ fontFamily: "'Amiri', serif" }}>
            <p className="text-base md:text-lg text-primary-foreground/90 font-medium">الجبل ما ينسى اللي زاره.. استودعناك الله</p>
            <p className="text-base md:text-lg text-primary-foreground/90 font-medium">وإن ما ساقتك الأيام لنا مرة ثانية</p>
            <p className="text-base md:text-lg text-primary-foreground/90 font-medium">يا جعل لقانا في جنات النعيم</p>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl hover:bg-accent hover:scale-110 transition-all duration-300"
                aria-label={social.ariaLabel}
              >
                <span>{social.icon}</span>
              </a>
            ))}
          </div>
          
          {/* Copyright */}
          <div className="border-t border-white/20 pt-8 space-y-3">
            <p className="text-primary-foreground/80">
              © 2024 اكتشف فيفاء - جميع الحقوق محفوظة
            </p>
            <p className="flex items-center justify-center gap-2 text-primary-foreground/70">
              <span>صمم بكل</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>لأجمل أماكن السعودية</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;