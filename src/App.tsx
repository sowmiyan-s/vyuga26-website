import { Toaster } from "@/components/ui/toaster";
import { MotionConfig } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Coordinators from "./pages/Coordinators";
import About from "./pages/About";
import Register from "./pages/Register";
import RegisterInterCollege from "./pages/RegisterInterCollege";
import Admin from "./pages/Admin";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Maintenance from "./pages/Maintenance";
import { useEffect } from "react";
import Lenis from "lenis";
import { useSettings } from "./hooks/useSettings";

const queryClient = new QueryClient();

import BackgroundWrapper from "./components/BackgroundWrapper";

import CustomCursor from "./components/CustomCursor";

const AppContent = () => {
  const { settings, loading } = useSettings();
  const location = useLocation();

  if (loading) return null;

  // Allow admin access even during maintenance
  if (settings.maintenance_mode && !location.pathname.startsWith('/admin')) {
    return <Maintenance />;
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:id" element={<EventDetail />} />
      <Route path="/coordinators" element={<Coordinators />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register-intercollege" element={<RegisterInterCollege />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    // Disable smooth scrolling on mobile to reduce lag
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isMobile]);

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig transition={isMobile ? { duration: 0 } : undefined} reducedMotion={isMobile ? "always" : "user"}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {!isMobile && <CustomCursor />}
            <BackgroundWrapper>
              <AppContent />
            </BackgroundWrapper>
          </BrowserRouter>
        </TooltipProvider>
      </MotionConfig>
    </QueryClientProvider>
  );
};
export default App;
