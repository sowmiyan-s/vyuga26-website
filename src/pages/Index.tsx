import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PrizePool from "@/components/PrizePool";
import Countdown from "@/components/Countdown";
import MarqueeSection from "@/components/Marquee";
import SpotlightEvents from "@/components/SpotlightEvents";
import PreRegistrationEvents from "@/components/PreRegistrationEvents";
import EventCategories from "@/components/EventCategories";
import PassCard from "@/components/PassCard";
import CoordinatorPreview from "@/components/CoordinatorPreview";
import EventPoster from "@/components/EventPoster";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <SEO
        title="Vyuga' 26"
        description="Join Vyuga' 26, the National Level Technical Symposium at VSB College of Engineering. Technical & Non-Technical events, Workshops, and more!"
      />
      <Navbar />
      <HeroSection />
      <PassCard />
      <PrizePool />
      <Countdown />
      <MarqueeSection />
      <SpotlightEvents />
      <PreRegistrationEvents />
      <EventCategories />
      <CoordinatorPreview />
      <EventPoster />
      <MapSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
