import { MapPin } from "lucide-react";
import { Place, categoryLabels, categoryColors } from "@/data/places";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PlaceGridCardProps {
  place: Place;
  onClick: () => void;
}

const PlaceGridCard = ({ place, onClick }: PlaceGridCardProps) => {
  const IconComponent = place.icon;
  
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer relative overflow-hidden rounded-xl bg-card shadow-card transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <AspectRatio ratio={4 / 3}>
          <img
            src={place.image}
            alt={place.title}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        </AspectRatio>
        
        {/* Category Badge */}
        <div className={`absolute top-4 right-4 ${categoryColors[place.category]} text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg`}>
          <IconComponent className="w-3.5 h-3.5" />
          <span>{categoryLabels[place.category].ar}</span>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white font-bold text-xl leading-tight mb-1 drop-shadow-lg">
            {place.title}
          </h3>
          {place.titleEn && (
            <p className="text-white/80 text-sm font-medium drop-shadow-md">
              {place.titleEn}
            </p>
          )}
        </div>
      </div>

      {/* Content Footer */}
      <div className="p-4 bg-card">
        {place.description && (
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {place.description}
          </p>
        )}
        
        {/* View Location Hint */}
        <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300">
          <MapPin className="w-4 h-4" />
          <span>عرض التفاصيل</span>
          <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">←</span>
        </div>
      </div>
    </div>
  );
};

export default PlaceGridCard;
