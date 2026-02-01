import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PrizePool from "@/components/PrizePool";
import Countdown from "@/components/Countdown";
import MarqueeSection from "@/components/Marquee";
import SpotlightEvents from "@/components/SpotlightEvents";
import EventCategories from "@/components/EventCategories";
import PassCard from "@/components/PassCard";
import CoordinatorPreview from "@/components/CoordinatorPreview";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <HeroSection />
      <PrizePool />
      <Countdown />
      <MarqueeSection />
      <SpotlightEvents />
      <EventCategories />
      <PassCard />
      <CoordinatorPreview />
      <MapSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
