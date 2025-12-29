import { Hotel, Trees, Coffee, Bed, Mountain, Binoculars, UtensilsCrossed, Tent, Home, Church } from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import CategorySection from "@/components/CategorySection";
import PlaceCard from "@/components/PlaceCard";
import DeveloperSection from "@/components/DeveloperSection";
import Footer from "@/components/Footer";
import VisitorCounter from "@/components/VisitorCounter";

const Index = () => {
  return (
    <div className="min-h-screen" dir="rtl">
      <Header />
      <Navigation />
      
      {/* Visitor Counter Section */}
      <section className="container mx-auto px-6 py-8 text-center">
        <VisitorCounter />
      </section>
      
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
          <PlaceCard
            title="بيت سهلان"
            description="بيت عتيق أعيد بريح عصرية وهوية فيفية أصيلة."
            englishDescription="An old house renovated with a modern touch and authentic Faifa identity."
            additionalContent={
              <p>
                للحجز أو التواصل: الإنستقرام{" "}
                <a 
                  href="https://www.instagram.com/bieatsahlan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  bieatsahlan
                </a>
              </p>
            }
            mapLink="https://maps.app.goo.gl/ZgDkhJv2dHvs69oQ8?g_st=ipc"
            icon={<Home />}
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
          <PlaceCard
            title="المصلى المعلق"
            description="مصلى للأعياد والمناسبات مشهور جداً."
            englishDescription="Famous hanging mosque for holidays and occasions."
            mapLink="https://maps.app.goo.gl/kxuvxMzVTKzSKJ7Y9?g_st=ipc"
            icon={<Church />}
          />
          <PlaceCard
            title="مطل العبسية"
            description="أعلى نقطة في الجبل يمكن لشخص الجلوس في أي مكان."
            englishDescription="The highest point in the mountain where one can sit anywhere."
            mapLink="https://maps.app.goo.gl/7oTLeZDz1Pbap2Tk8?g_st=ipc"
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
            mapLink="https://maps.app.goo.gl/Cjh7oPM5aX2QsdUR6?g_st=ipc"
            icon={<Coffee />}
          />
          <PlaceCard
            title="مقهى جارة الغيم – Jarat Al-Ghaim Café"
            description="مطل على الجبال من الأعلى."
            englishDescription="Mountaintop view from above."
            mapLink="https://maps.app.goo.gl/FekVqv8zkzj5Fuk97?g_st=ipc"
            icon={<Coffee />}
          />
          <PlaceCard
            title="مقهى ومطل إيوان – Iwan Café & Viewpoint"
            description="كافيه مع إطلالة جميلة."
            englishDescription="Café with a beautiful scenic view."
            mapLink="https://maps.app.goo.gl/yWadi31KNE7ykdN86?g_st=ipc"
            icon={<Coffee />}
          />
          <PlaceCard
            title="مقهى سكون"
            description="إطلالة جميلة ورائعة على الجبال."
            englishDescription="Beautiful and amazing view of the mountains."
            mapLink="https://maps.app.goo.gl/RA3bdJW8rLZzjTFi9?g_st=ipc"
            icon={<Coffee />}
          />
          <PlaceCard
            title="كافية تالقة"
            description="مقهى جديد وجميل واسم مقتبس من شجرة مُعمرة في الجبل."
            englishDescription="New and beautiful café named after an ancient tree in the mountain."
            mapLink="https://maps.app.goo.gl/9MfLxBT1AghGifAR8?g_st=ipc"
            icon={<Coffee />}
          />
          <PlaceCard
            title="لب القهوة"
            mapLink="https://maps.app.goo.gl/EJ1xKPEnpdgGF9Z3A?g_st=ipc"
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