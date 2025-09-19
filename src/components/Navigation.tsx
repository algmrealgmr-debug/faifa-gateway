import { Hotel, Trees, Coffee } from "lucide-react";

const Navigation = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    {
      id: "hotels",
      label: "الفنادق",
      icon: Hotel,
      ariaLabel: "الانتقال إلى قسم الفنادق"
    },
    {
      id: "parks", 
      label: "المنتزهات",
      icon: Trees,
      ariaLabel: "الانتقال إلى قسم المنتزهات"
    },
    {
      id: "cafes",
      label: "الكافيهات", 
      icon: Coffee,
      ariaLabel: "الانتقال إلى قسم الكافيهات"
    }
  ];

  return (
    <nav className="bg-mountain text-mountain-foreground sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6">
        <ul className="flex justify-center items-center flex-wrap gap-6 py-4">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 hover:bg-accent hover:text-accent-foreground font-medium text-lg"
                  aria-label={item.ariaLabel}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;