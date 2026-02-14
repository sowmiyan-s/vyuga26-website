import { Toaster } from "@/components/ui/toaster";
import { MotionConfig } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import Lenis from "lenis";
import { useSettings } from "./hooks/useSettings";
import { HelmetProvider } from "react-helmet-async";

// Eager load Home page for performance
import Index from "./pages/Index";

// Lazy load other pages
const Events = lazy(() => import("./pages/Events"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const Coordinators = lazy(() => import("./pages/Coordinators"));
const About = lazy(() => import("./pages/About"));
const Register = lazy(() => import("./pages/Register"));
const RegisterInterCollege = lazy(() => import("./pages/RegisterInterCollege"));
const RegisterDepartment = lazy(() => import("./pages/RegisterDepartment"));
const Admin = lazy(() => import("./pages/Admin"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const Terms = lazy(() => import("./pages/Terms"));
const UpdateEvents = lazy(() => import("./pages/UpdateEvents"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Maintenance = lazy(() => import("./pages/Maintenance"));

const queryClient = new QueryClient();

import BackgroundWrapper from "./components/BackgroundWrapper";
import CustomCursor from "./components/CustomCursor";

const PageLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-uiverse-purple border-t-transparent rounded-full animate-spin" />
  </div>
);

const AppContent = () => {
  const { settings, loading } = useSettings();
  const location = useLocation();

  if (loading) return <PageLoader />;

  // Allow admin access even during maintenance
  if (settings.maintenance_mode && !location.pathname.startsWith('/admin')) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Maintenance />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/coordinators" element={<Coordinators />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-intercollege" element={<RegisterInterCollege />} />
        <Route path="/register-department" element={<RegisterDepartment />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/update-events" element={<UpdateEvents />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
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
    <HelmetProvider>
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
    </HelmetProvider>
  );
};
export default App;
