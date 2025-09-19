import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PlaceCardProps {
  title: string;
  description?: string;
  englishDescription?: string;
  additionalContent?: React.ReactNode;
  mapLink: string;
  icon: React.ReactNode;
}

const PlaceCard = ({ title, description, englishDescription, additionalContent, mapLink, icon }: PlaceCardProps) => {
  return (
    <Card className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="text-accent text-xl mt-1 group-hover:scale-110 transition-transform">
              {icon}
            </div>
            <h3 className="text-xl font-bold text-primary leading-tight flex-1">
              {title}
            </h3>
          </div>
          
          {(description || englishDescription || additionalContent) && (
            <div className="bg-muted/50 p-4 rounded-lg border-r-4 border-secondary space-y-2">
              {description && (
                <p className="text-foreground leading-relaxed">{description}</p>
              )}
              {englishDescription && (
                <p className="text-muted-foreground text-sm italic leading-relaxed">
                  {englishDescription}
                </p>
              )}
              {additionalContent && (
                <div className="text-foreground leading-relaxed">
                  {additionalContent}
                </div>
              )}
            </div>
          )}
          
          <Button
            asChild
            className="w-full bg-primary hover:bg-secondary text-primary-foreground transition-colors"
          >
            <a 
              href={mapLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span>الموقع على الخريطة</span>
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaceCard;