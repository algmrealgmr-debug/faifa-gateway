import { Hotel, Trees, Coffee, Bed, Mountain, Binoculars, UtensilsCrossed, Tent } from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import CategorySection from "@/components/CategorySection";
import PlaceCard from "@/components/PlaceCard";
import DeveloperSection from "@/components/DeveloperSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen" dir="rtl">
      <Header />
      <Navigation />
      
      <main className="container mx-auto px-6 py-12 space-y-12">
        {/* Hotels Section */}
        <CategorySection
          id="hotels"
          title="الفنادق / Hotels"
          icon={<Hotel />}
        >
          <PlaceCard
            title="فندق جارة الغيم – Jarat Al Gheim Hotel"
            description="يتواجد مطل وكافيه في أعلى الفندق."
            englishDescription="Rooftop café with a panoramic view."
            mapLink="https://maps.app.goo.gl/aV8KzXz4JTAXTBPh6?g_st=ipc"
            icon={<Bed />}
          />
          <PlaceCard
            title="فندق فيفاء الفاخر – Faifa Luxury Hotel"
            description="يتواجد مطل وكافيه في أعلى الفندق."
            englishDescription="Rooftop café with a scenic view."
            mapLink="https://maps.app.goo.gl/WQnUcteQvjDkLqUb7?g_st=ipc"
            icon={<Bed />}
          />
          <PlaceCard
            title="فندق إيوان – Iwan Hotel"
            description="يتواجد مطل وكافيه في أعلى الفندق."
            englishDescription="Rooftop café with a scenic view."
            mapLink="https://maps.app.goo.gl/TvqSciP5UrBrPBNS8?g_st=ipc"
            icon={<Bed />}
          />
        </CategorySection>

        {/* Parks Section */}
        <CategorySection
          id="parks"
          title="المنتزهات / Parks & Resorts"
          icon={<Trees />}
        >
          <PlaceCard
            title="منتزه وإطلالة الخطم – Al-Khatm Park & Viewpoint"
            description="منتزه متكامل للعائلة."
            englishDescription="Family-friendly park with great views."
            mapLink="https://maps.app.goo.gl/Cdfrj4YBB88aH2yf9?g_st=ipc"
            icon={<Mountain />}
          />
          <PlaceCard
            title="منتجع الباخرة – Al-Bakhira Resort"
            mapLink="https://maps.app.goo.gl/4No4mWgXs3vVz7CD7?g_st=ipc"
            icon={<Tent />}
          />
          <PlaceCard
            title="ممشى البن الخولاني – Khawlani Coffee Trail"
            description="ممشى سياحي مرتبط بتراث زراعة البن الخولاني."
            englishDescription="Coffee heritage walking trail."
            mapLink="https://maps.app.goo.gl/EkhwSPbHFqKNcyvs7?g_st=ipc"
            icon={<UtensilsCrossed />}
          />
          <PlaceCard
            title="مطل الدفرة – Al-Dafrah Viewpoint"
            mapLink="https://maps.app.goo.gl/ex9dGXbr9Vu8gCnc8?g_st=ipc"
            icon={<Binoculars />}
          />
          <PlaceCard
            title="مطل قرضة – Qarza Viewpoint"
            mapLink="https://maps.app.goo.gl/yibESTRS7VWEYEKz6?g_st=ipc"
            icon={<Binoculars />}
          />
        </CategorySection>

        {/* Cafes Section */}
        <CategorySection
          id="cafes"
          title="الكافيهات / Cafes"
          icon={<Coffee />}
        >
          <PlaceCard
            title="مقهى جارة القمر – Jarat Al-Qamar Café"
            description="إطلالة مميزة على جبال فيفاء."
            englishDescription="Unique view of Faifa mountains."
            mapLink="https://maps.app.goo.gl/WgVpyAjaoCbnZRX56?g_st=ipc"
            icon={<Coffee />}
          />
          <PlaceCard
            title="مقهى ومطل إيوان – Iwan Café & Viewpoint"
            description="كافيه مع إطلالة جميلة."
            englishDescription="Café with a beautiful scenic view."
            mapLink="https://maps.app.goo.gl/yWadi31KNE7ykdN86?g_st=ipc"
            icon={<Coffee />}
          />
        </CategorySection>
      </main>

      <div className="container mx-auto px-6 mb-12">
        <DeveloperSection />
      </div>

      <Footer />
    </div>
  );
};

export default Index;