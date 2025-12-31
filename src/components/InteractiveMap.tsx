import { useState, useCallback, useEffect } from "react";
import { MapPin, Navigation, X, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Location {
  id: string;
  name: string;
  nameEn: string;
  type: "hotel" | "park" | "cafe";
  lat: number;
  lng: number;
  mapLink: string;
}

// Faifa locations with coordinates extracted from the place names
const locations: Location[] = [
  // Hotels
  {
    id: "jarat-al-gheim",
    name: "فندق جارة الغيم",
    nameEn: "Jarat Al Gheim Hotel",
    type: "hotel",
    lat: 17.2565,
    lng: 43.1145,
    mapLink: "https://maps.app.goo.gl/aV8KzXz4JTAXTBPh6"
  },
  {
    id: "faifa-luxury",
    name: "فندق فيفاء الفاخر",
    nameEn: "Faifa Luxury Hotel",
    type: "hotel",
    lat: 17.2580,
    lng: 43.1130,
    mapLink: "https://maps.app.goo.gl/WQnUcteQvjDkLqUb7"
  },
  {
    id: "iwan-hotel",
    name: "فندق إيوان",
    nameEn: "Iwan Hotel",
    type: "hotel",
    lat: 17.2555,
    lng: 43.1160,
    mapLink: "https://maps.app.goo.gl/TvqSciP5UrBrPBNS8"
  },
  {
    id: "beit-sahlan",
    name: "بيت سهلان",
    nameEn: "Beit Sahlan",
    type: "hotel",
    lat: 17.2548,
    lng: 43.1175,
    mapLink: "https://maps.app.goo.gl/ZgDkhJv2dHvs69oQ8"
  },
  // Parks & Viewpoints
  {
    id: "al-khatm",
    name: "منتزه وإطلالة الخطم",
    nameEn: "Al-Khatm Park & Viewpoint",
    type: "park",
    lat: 17.2610,
    lng: 43.1085,
    mapLink: "https://maps.app.goo.gl/Cdfrj4YBB88aH2yf9"
  },
  {
    id: "souq-alnafiah",
    name: "سوق النفيعة الشعبي",
    nameEn: "Al-Nafi'ah Traditional Market",
    type: "park",
    lat: 17.2590,
    lng: 43.1120,
    mapLink: "https://maps.app.goo.gl/TzAGVeryF34ooRbh7"
  },
  {
    id: "al-bakhira",
    name: "منتجع الباخرة",
    nameEn: "Al-Bakhira Resort",
    type: "park",
    lat: 17.2520,
    lng: 43.1200,
    mapLink: "https://maps.app.goo.gl/4No4mWgXs3vVz7CD7"
  },
  {
    id: "khawlani-trail",
    name: "ممشى البن الخولاني",
    nameEn: "Khawlani Coffee Trail",
    type: "park",
    lat: 17.2575,
    lng: 43.1095,
    mapLink: "https://maps.app.goo.gl/EkhwSPbHFqKNcyvs7"
  },
  {
    id: "al-dafrah",
    name: "مطل الدفرة",
    nameEn: "Al-Dafrah Viewpoint",
    type: "park",
    lat: 17.2630,
    lng: 43.1050,
    mapLink: "https://maps.app.goo.gl/ex9dGXbr9Vu8gCnc8"
  },
  {
    id: "qarza",
    name: "مطل قرضة",
    nameEn: "Qarza Viewpoint",
    type: "park",
    lat: 17.2540,
    lng: 43.1210,
    mapLink: "https://maps.app.goo.gl/yibESTRS7VWEYEKz6"
  },
  {
    id: "hanging-mosque",
    name: "المصلى المعلق",
    nameEn: "The Hanging Mosque",
    type: "park",
    lat: 17.2560,
    lng: 43.1140,
    mapLink: "https://maps.app.goo.gl/kxuvxMzVTKzSKJ7Y9"
  },
  {
    id: "al-absiyah",
    name: "مطل العبسية",
    nameEn: "Al-Absiyah Viewpoint",
    type: "park",
    lat: 17.2650,
    lng: 43.1030,
    mapLink: "https://maps.app.goo.gl/7oTLeZDz1Pbap2Tk8"
  },
  // Cafes
  {
    id: "jarat-alqamar",
    name: "مقهى جارة القمر",
    nameEn: "Jarat Al-Qamar Café",
    type: "cafe",
    lat: 17.2572,
    lng: 43.1152,
    mapLink: "https://maps.app.goo.gl/Cjh7oPM5aX2QsdUR6"
  },
  {
    id: "jarat-alghaim-cafe",
    name: "مقهى جارة الغيم",
    nameEn: "Jarat Al-Ghaim Café",
    type: "cafe",
    lat: 17.2567,
    lng: 43.1148,
    mapLink: "https://maps.app.goo.gl/FekVqv8zkzj5Fuk97"
  },
  {
    id: "iwan-cafe",
    name: "مقهى ومطل إيوان",
    nameEn: "Iwan Café & Viewpoint",
    type: "cafe",
    lat: 17.2558,
    lng: 43.1158,
    mapLink: "https://maps.app.goo.gl/yWadi31KNE7ykdN86"
  },
  {
    id: "sukoon",
    name: "مقهى سكون",
    nameEn: "Sukoon Café",
    type: "cafe",
    lat: 17.2583,
    lng: 43.1135,
    mapLink: "https://maps.app.goo.gl/RA3bdJW8rLZzjTFi9"
  },
  {
    id: "taliqa",
    name: "كافية تالقة",
    nameEn: "Taliqa Café",
    type: "cafe",
    lat: 17.2545,
    lng: 43.1168,
    mapLink: "https://maps.app.goo.gl/9MfLxBT1AghGifAR8"
  },
  {
    id: "lub-alqahwa",
    name: "لب القهوة",
    nameEn: "Lub Al-Qahwa Café",
    type: "cafe",
    lat: 17.2552,
    lng: 43.1172,
    mapLink: "https://maps.app.goo.gl/EJ1xKPEnpdgGF9Z3A"
  }
];

const typeColors = {
  hotel: { bg: "bg-blue-500", text: "text-blue-500", border: "border-blue-500" },
  park: { bg: "bg-green-500", text: "text-green-500", border: "border-green-500" },
  cafe: { bg: "bg-amber-500", text: "text-amber-500", border: "border-amber-500" }
};

const typeLabels = {
  hotel: { ar: "فندق", en: "Hotel" },
  park: { ar: "منتزه", en: "Park" },
  cafe: { ar: "مقهى", en: "Cafe" }
};

const InteractiveMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [filter, setFilter] = useState<"all" | "hotel" | "park" | "cafe">("all");

  const filteredLocations = filter === "all" 
    ? locations 
    : locations.filter(loc => loc.type === filter);

  const handleMarkerClick = useCallback((location: Location) => {
    setSelectedLocation(location);
  }, []);

  const handleOpenInMaps = useCallback((mapLink: string) => {
    window.open(mapLink, "_blank", "noopener,noreferrer");
  }, []);

  // Center of Faifa
  const center = { lat: 17.2580, lng: 43.1130 };

  return (
    <section id="map" className="py-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Map className="w-8 h-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            خريطة المعالم / Landmarks Map
          </h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          اكتشف جميع المعالم السياحية في فيفاء على الخريطة التفاعلية
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className="rounded-full"
        >
          الكل / All
        </Button>
        <Button
          variant={filter === "hotel" ? "default" : "outline"}
          onClick={() => setFilter("hotel")}
          className={`rounded-full ${filter === "hotel" ? "" : "hover:border-blue-500 hover:text-blue-500"}`}
        >
          🏨 الفنادق / Hotels
        </Button>
        <Button
          variant={filter === "park" ? "default" : "outline"}
          onClick={() => setFilter("park")}
          className={`rounded-full ${filter === "park" ? "" : "hover:border-green-500 hover:text-green-500"}`}
        >
          🌳 المنتزهات / Parks
        </Button>
        <Button
          variant={filter === "cafe" ? "default" : "outline"}
          onClick={() => setFilter("cafe")}
          className={`rounded-full ${filter === "cafe" ? "" : "hover:border-amber-500 hover:text-amber-500"}`}
        >
          ☕ الكافيهات / Cafes
        </Button>
      </div>

      {/* Map Container */}
      <Card className="overflow-hidden shadow-lg border-2 border-primary/20">
        <CardContent className="p-0 relative">
          {/* Embedded Google Map */}
          <div className="relative w-full h-[400px] md:h-[500px]">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d8000!2d${center.lng}!3d${center.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2ssa!4v1703936400000!5m2!1sar!2ssa`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title="Faifa Map"
            />
            
            {/* Custom Overlay with Markers */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Dynamic Markers */}
              {filteredLocations.map((location) => {
                // Convert lat/lng to percentage positions relative to map bounds
                const mapBounds = {
                  north: 17.270,
                  south: 17.248,
                  east: 43.125,
                  west: 43.100
                };
                
                const x = ((location.lng - mapBounds.west) / (mapBounds.east - mapBounds.west)) * 100;
                const y = ((mapBounds.north - location.lat) / (mapBounds.north - mapBounds.south)) * 100;
                
                // Only show markers within bounds
                if (x < 0 || x > 100 || y < 0 || y > 100) return null;
                
                return (
                  <div
                    key={location.id}
                    className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-full group"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    onClick={() => handleMarkerClick(location)}
                  >
                    {/* Marker Pin */}
                    <div className={`relative ${typeColors[location.type].bg} w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-transform hover:scale-125 z-10`}>
                      <MapPin className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </div>
                    {/* Pin Tail */}
                    <div className={`absolute left-1/2 -translate-x-1/2 -bottom-1 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] ${location.type === 'hotel' ? 'border-t-blue-500' : location.type === 'park' ? 'border-t-green-500' : 'border-t-amber-500'} border-l-transparent border-r-transparent`}></div>
                    
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                      <div className="bg-card/95 backdrop-blur-sm rounded-lg p-2 shadow-lg whitespace-nowrap border border-border">
                        <p className="text-xs font-semibold text-foreground">{location.name}</p>
                        <p className="text-[10px] text-muted-foreground">{location.nameEn}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Map Legend */}
              <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg pointer-events-auto">
                <p className="text-xs font-semibold text-foreground mb-2">دليل الألوان:</p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="text-muted-foreground">فنادق</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="text-muted-foreground">منتزهات</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="text-muted-foreground">كافيهات</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Selected Location Popup */}
      {selectedLocation && (
        <div className="mt-4 p-4 bg-card rounded-lg shadow-soft border border-border animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${typeColors[selectedLocation.type].bg} flex items-center justify-center text-white`}>
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-bold text-foreground">{selectedLocation.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedLocation.nameEn}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-primary hover:bg-secondary"
                onClick={() => handleOpenInMaps(selectedLocation.mapLink)}
              >
                <Navigation className="w-4 h-4 ml-2" />
                افتح في خرائط قوقل
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedLocation(null)}
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Location Cards Grid */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-primary mb-4 text-center">
          اختر موقعاً للانتقال إليه / Select a location
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredLocations.map((location) => (
            <Card 
              key={location.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-r-4 ${typeColors[location.type].border} ${
                selectedLocation?.id === location.id ? "ring-2 ring-primary shadow-lg" : ""
              }`}
              onClick={() => handleMarkerClick(location)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full ${typeColors[location.type].bg} flex items-center justify-center text-white flex-shrink-0`}>
                    <MapPin size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-foreground text-sm leading-tight mb-1 truncate">
                      {location.name}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">
                      {location.nameEn}
                    </p>
                    <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${typeColors[location.type].bg} text-white`}>
                      {typeLabels[location.type].ar}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full mt-3 bg-primary hover:bg-secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenInMaps(location.mapLink);
                  }}
                >
                  <Navigation className="w-4 h-4 ml-2" />
                  افتح في خرائط قوقل
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </section>
  );
};

export default InteractiveMap;
