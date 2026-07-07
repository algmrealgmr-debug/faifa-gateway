import { useState } from "react";
import { Heart, Share2, Copy, Check, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const SHARE_URL = "https://faifa.lovable.app";
const SHARE_TITLE = "اكتشف فيفاء";
const SHARE_TEXT = "تعرف على فيفاء وجمالها من خلال هذا الموقع الرائع ✨";

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      toast({
        title: "تم النسخ",
        description: "تم نسخ الرابط بنجاح",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "خطأ",
        description: "لم نتمكن من نسخ الرابط",
        variant: "destructive",
      });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: SHARE_TITLE,
          text: SHARE_TEXT,
          url: SHARE_URL,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  return (
    <footer className="bg-gradient-hero text-primary-foreground mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center space-y-8">
          {/* Share Button */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-primary-foreground text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                aria-label="مشاركة الموقع"
              >
                <Share2 className="w-4 h-4" />
                <span>شارك الموقع</span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" dir="rtl">
              <DialogHeader>
                <DialogTitle className="text-center">مشاركة الموقع</DialogTitle>
                <DialogDescription className="text-center">
                  انسخ الرابط أو شاركه مباشرة مع من تحب
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <div className="flex items-center gap-2">
                  <Input
                    value={SHARE_URL}
                    readOnly
                    className="flex-1 text-left ltr:text-left"
                    dir="ltr"
                  />
                  <Button
                    type="button"
                    size="icon"
                    onClick={handleCopy}
                    className="shrink-0"
                    aria-label="نسخ الرابط"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <Button
                  type="button"
                  onClick={handleNativeShare}
                  className="w-full gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>مشاركة عبر تطبيقات الجوال</span>
                </Button>
                <a
                  href={SHARE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>فتح الموقع</span>
                </a>
              </div>
            </DialogContent>
          </Dialog>

          {/* Main Title */}
          <div className="max-w-2xl mx-auto space-y-2">
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
