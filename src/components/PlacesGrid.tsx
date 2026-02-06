import { useState, useMemo } from "react";
import { places, Place } from "@/data/places";
import PlaceGridCard from "./PlaceGridCard";
import PlaceDetailsDrawer from "./PlaceDetailsDrawer";
import FloatingChipsNav from "./FloatingChipsNav";

type CategoryFilter = "all" | "hotel" | "park" | "cafe";

const PlacesGrid = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredPlaces = useMemo(() => {
    if (activeFilter === "all") return places;
    return places.filter((place) => place.category === activeFilter);
  }, [activeFilter]);

  const handleCardClick = (place: Place) => {
    setSelectedPlace(place);
    setDrawerOpen(true);
  };

  const handleShowOnMap = () => {
    const mapElement = document.getElementById("map");
    if (mapElement) {
      const offset = 100;
      const elementPosition = mapElement.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const getCategoryTitle = () => {
    switch (activeFilter) {
      case "hotel":
        return "الفنادق / Hotels";
      case "park":
        return "المنتزهات / Parks";
      case "cafe":
        return "الكافيهات / Cafés";
      default:
        return "جميع الأماكن / All Places";
    }
  };

  return (
    <>
      <FloatingChipsNav 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter} 
      />
      
      <section className="container mx-auto px-6 py-12">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {getCategoryTitle()}
          </h2>
          <p className="text-muted-foreground">
            {filteredPlaces.length} {activeFilter === "all" ? "مكان" : "أماكن"} متاحة
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlaces.map((place) => (
            <PlaceGridCard
              key={place.id}
              place={place}
              onClick={() => handleCardClick(place)}
            />
          ))}
        </div>
      </section>

      {/* Details Drawer */}
      <PlaceDetailsDrawer
        place={selectedPlace}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onShowOnMap={handleShowOnMap}
      />
    </>
  );
};

export default PlacesGrid;
