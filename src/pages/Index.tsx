import Header from "@/components/Header";
import PlacesGrid from "@/components/PlacesGrid";
import DeveloperSection from "@/components/DeveloperSection";
import Footer from "@/components/Footer";
import VisitorCounter from "@/components/VisitorCounter";
import InteractiveMap from "@/components/InteractiveMap";
import BackToTop from "@/components/BackToTop";
import AIChatWidget from "@/components/AIChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen" dir="rtl">
      <Header />
      
      {/* Visitor Counter Section */}
      <section className="container mx-auto px-6 py-8 text-center">
        <VisitorCounter />
      </section>

      {/* AI Search Section */}
      <section className="container mx-auto px-6 pb-8">
        <AIChatWidget />
      </section>
      
      {/* Places Grid with Floating Chips Nav */}
      <PlacesGrid />

      {/* Interactive Map Section */}
      <div className="container mx-auto px-6">
        <InteractiveMap />
      </div>

      <div className="container mx-auto px-6 mb-12">
        <DeveloperSection />
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
