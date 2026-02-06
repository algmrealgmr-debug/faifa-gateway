import { useState } from "react";
import { MapPin, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExplodedPlaceView from "./ExplodedPlaceView";

interface PlaceCardProps {
  title: string;
  description?: string;
  englishDescription?: string;
  additionalContent?: React.ReactNode;
  mapLink: string;
  icon: React.ReactNode;
}

const PlaceCard = ({ title, description, englishDescription, additionalContent, mapLink, icon }: PlaceCardProps) => {
  const [isExplodedOpen, setIsExplodedOpen] = useState(false);

  return (
    <>
      <div 
        className="group bg-card rounded-lg shadow-[0_2px_8px_hsl(0_0%_0%/0.04),0_8px_24px_hsl(0_0%_0%/0.06)] p-6 hover:shadow-[0_4px_16px_hsl(0_0%_0%/0.08),0_12px_32px_hsl(0_0%_0%/0.08)] transition-all duration-300 cursor-pointer relative overflow-hidden"
        onClick={() => setIsExplodedOpen(true)}
      >
        {/* Hover overlay indicator */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
        
        {/* Expand icon */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Expand className="w-4 h-4 text-primary" />
          </div>
        </div>

        <div className="space-y-5 relative z-10">
          <div className="flex items-start gap-4">
            <div className="text-primary/80 mt-0.5 group-hover:text-primary transition-colors">
              {icon}
            </div>
            <h3 className="text-lg font-medium text-foreground leading-snug flex-1">
              {title}
            </h3>
          </div>
          
          {(description || englishDescription || additionalContent) && (
            <div className="space-y-2 pr-10">
              {description && (
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
              )}
              {englishDescription && (
                <p className="text-muted-foreground/70 text-xs leading-relaxed">
                  {englishDescription}
                </p>
              )}
              {additionalContent && (
                <div className="text-muted-foreground text-sm leading-relaxed" onClick={(e) => e.stopPropagation()}>
                  {additionalContent}
                </div>
              )}
            </div>
          )}
          
          <div className="pr-10 flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <a 
                href={mapLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>عرض الموقع</span>
              </a>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-primary/70 hover:text-primary hover:bg-primary/10"
              onClick={(e) => {
                e.stopPropagation();
                setIsExplodedOpen(true);
              }}
            >
              <Expand className="w-3.5 h-3.5 mr-1" />
              <span>استكشف</span>
            </Button>
          </div>
        </div>
      </div>

      <ExplodedPlaceView
        isOpen={isExplodedOpen}
        onClose={() => setIsExplodedOpen(false)}
        title={title}
        description={description}
        englishDescription={englishDescription}
        mapLink={mapLink}
        icon={icon}
      />
    </>
  );
};

export default PlaceCard;