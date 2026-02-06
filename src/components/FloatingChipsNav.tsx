import { Hotel, Trees, Coffee, Sparkles } from "lucide-react";

type CategoryFilter = "all" | "hotel" | "park" | "cafe";

interface FloatingChipsNavProps {
  activeFilter: CategoryFilter;
  onFilterChange: (filter: CategoryFilter) => void;
}

const chips = [
  {
    id: "all" as CategoryFilter,
    label: "الكل",
    labelEn: "All",
    icon: Sparkles,
    activeClass: "bg-primary text-primary-foreground shadow-nature",
  },
  {
    id: "hotel" as CategoryFilter,
    label: "الفنادق",
    labelEn: "Hotels",
    icon: Hotel,
    activeClass: "bg-blue-500 text-white shadow-lg shadow-blue-500/30",
  },
  {
    id: "park" as CategoryFilter,
    label: "المنتزهات",
    labelEn: "Parks",
    icon: Trees,
    activeClass: "bg-green-500 text-white shadow-lg shadow-green-500/30",
  },
  {
    id: "cafe" as CategoryFilter,
    label: "الكافيهات",
    labelEn: "Cafes",
    icon: Coffee,
    activeClass: "bg-amber-500 text-white shadow-lg shadow-amber-500/30",
  },
];

const FloatingChipsNav = ({ activeFilter, onFilterChange }: FloatingChipsNavProps) => {
  return (
    <nav className="sticky top-0 z-40 py-4 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {chips.map((chip) => {
            const isActive = activeFilter === chip.id;
            const IconComponent = chip.icon;
            
            return (
              <button
                key={chip.id}
                onClick={() => onFilterChange(chip.id)}
                className={`
                  relative flex items-center gap-2.5 px-5 py-2.5 rounded-full font-medium text-sm
                  transition-all duration-300 ease-out
                  ${isActive 
                    ? chip.activeClass 
                    : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground shadow-soft border border-border/50"
                  }
                  ${isActive ? "scale-105" : "hover:scale-105"}
                `}
                aria-pressed={isActive}
              >
                <IconComponent className={`w-4 h-4 ${isActive ? "" : "opacity-70"}`} />
                <span>{chip.label}</span>
                
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default FloatingChipsNav;
