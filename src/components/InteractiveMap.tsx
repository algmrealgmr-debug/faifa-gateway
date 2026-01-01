import { useState, useCallback } from "react";
import { MapPin, Navigation, X, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Location {
  id: string;
  name: string;
  nameEn: string;
  type: "hotel" | "park" | "cafe";
  lat: number;
  lng: number;
  mapLink: string;
}

// Faifa locations with coordinates
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
  hotel: { bg: "bg-blue-500", text: "text-blue-500", border: "border-blue-500", hex: "#3b82f6" },
  park: { bg: "bg-green-500", text: "text-green-500", border: "border-green-500", hex: "#22c55e" },
  cafe: { bg: "bg-amber-500", text: "text-amber-500", border: "border-amber-500", hex: "#f59e0b" }
};

// Create custom marker icons for each type
const createCustomIcon = (type: "hotel" | "park" | "cafe") => {
  const color = typeColors[type].hex;
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.2s;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

// Component to handle map view changes when filter changes
const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};

const InteractiveMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [filter, setFilter] = useState<"all" | "hotel" | "park" | "cafe">("all");

  const center: [number, number] = [17.2580, 43.1130];

  const filteredLocations = filter === "all" 
    ? locations 
    : locations.filter(loc => loc.type === filter);

  const handleMarkerClick = useCallback((location: Location) => {
    setSelectedLocation(location);
  }, []);

  const handleOpenInMaps = useCallback((mapLink: string) => {
    window.open(mapLink, "_blank", "noopener,noreferrer");
  }, []);

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
          <div className="relative w-full h-[400px] md:h-[500px]">
            <MapContainer
              center={center}
              zoom={14}
              scrollWheelZoom={true}
              className="w-full h-full z-0"
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapController center={center} />
              
              {filteredLocations.map((location) => (
                <Marker
                  key={location.id}
                  position={[location.lat, location.lng]}
                  icon={createCustomIcon(location.type)}
                  eventHandlers={{
                    click: () => handleMarkerClick(location)
                  }}
                >
                  <Popup>
                    <div className="text-center p-1">
                      <p className="font-bold text-sm">{location.name}</p>
                      <p className="text-xs text-gray-500">{location.nameEn}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <span className="text-sm text-muted-foreground">فنادق / Hotels</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-sm text-muted-foreground">منتزهات / Parks</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-amber-500"></div>
          <span className="text-sm text-muted-foreground">كافيهات / Cafes</span>
        </div>
      </div>
      
      {/* Selected Location Smart Popup Card */}
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

    </section>
  );
};

export default InteractiveMap;
