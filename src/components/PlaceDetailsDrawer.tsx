import { MapPin, Navigation, Instagram, X } from "lucide-react";
import { Place, categoryLabels, categoryColors } from "@/data/places";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PlaceDetailsDrawerProps {
  place: Place | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onShowOnMap: () => void;
}

const PlaceDetailsDrawer = ({ place, open, onOpenChange, onShowOnMap }: PlaceDetailsDrawerProps) => {
  if (!place) return null;

  const IconComponent = place.icon;

  const handleOpenInMaps = () => {
    window.open(place.mapLink, "_blank", "noopener,noreferrer");
  };

  const handleShowOnMap = () => {
    onOpenChange(false);
    // Small delay to let the drawer close before scrolling
    setTimeout(() => {
      onShowOnMap();
    }, 300);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full sm:max-w-lg p-0 overflow-y-auto">
        {/* Hero Image */}
        <div className="relative">
          <AspectRatio ratio={16 / 10}>
            <img
              src={place.image}
              alt={place.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </AspectRatio>
          
          {/* Category Badge */}
          <div className={`absolute top-4 right-4 ${categoryColors[place.category]} text-white text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2 shadow-lg`}>
            <IconComponent className="w-4 h-4" />
            <span>{categoryLabels[place.category].ar}</span>
          </div>

          {/* Close Button */}
          <SheetClose className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors">
            <X className="w-5 h-5" />
          </SheetClose>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <SheetHeader className="text-right space-y-3">
            <SheetTitle className="text-2xl font-bold text-foreground leading-tight">
              {place.title}
            </SheetTitle>
            {place.titleEn && (
              <SheetDescription className="text-base text-muted-foreground">
                {place.titleEn}
              </SheetDescription>
            )}
          </SheetHeader>

          {/* Description */}
          {(place.description || place.englishDescription) && (
            <div className="space-y-3 py-4 border-y border-border">
              {place.description && (
                <p className="text-foreground leading-relaxed">{place.description}</p>
              )}
              {place.englishDescription && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {place.englishDescription}
                </p>
              )}
            </div>
          )}

          {/* Instagram Link (if available) */}
          {place.instagramLink && (
            <a
              href={place.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              <Instagram className="w-5 h-5" />
              <span className="font-medium">للحجز والتواصل عبر الأنستقرام</span>
            </a>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={handleOpenInMaps}
              className="w-full h-12 text-base gap-3 bg-primary hover:bg-primary/90"
            >
              <Navigation className="w-5 h-5" />
              <span>افتح في خرائط قوقل</span>
            </Button>
            
            <Button
              onClick={handleShowOnMap}
              variant="outline"
              className="w-full h-12 text-base gap-3 border-primary/30 text-primary hover:bg-primary/5"
            >
              <MapPin className="w-5 h-5" />
              <span>عرض الموقع على الخريطة</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PlaceDetailsDrawer;
