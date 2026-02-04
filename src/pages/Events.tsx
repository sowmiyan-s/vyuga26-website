import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { events, EventCategory } from "@/config/events";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { UiverseButton } from "@/components/ui/UiverseButton";
import { UiverseCard } from "@/components/ui/UiverseCard";
import { motion, AnimatePresence } from "framer-motion";
import { IndianRupee } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

const categories: { id: EventCategory | "all"; label: string }[] = [
  { id: "all", label: "All Events" },
  { id: "technical", label: "Technical" },
  { id: "non-technical", label: "Non-Technical" },
];

const Events = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = (searchParams.get("category") as EventCategory) || "all";
  const [activeCategory, setActiveCategory] = useState<EventCategory | "all">(initialCategory);
  const { settings } = useSettings();

  const filteredEvents =
    activeCategory === "all"
      ? events
      : events.filter((event) => event.category === activeCategory);

  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-uiverse-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-uiverse-sky/10 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="pt-32 pb-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-uiverse-purple text-sm tracking-[0.2em] uppercase mb-2 font-bold"
            >
              Explore
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-uiverse-purple via-white to-uiverse-sky drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              Events
            </motion.h1>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveCategory(category.id)}
                className={`relative px-6 py-3 rounded-full font-bold transition-all duration-300 overflow-hidden group ${activeCategory === category.id
                  ? "text-white shadow-[0_0_20px_rgba(223,25,251,0.5)]"
                  : "text-gray-400 hover:text-white border border-white/10 hover:border-uiverse-purple/50"
                  }`}
              >
                {activeCategory === category.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-uiverse-purple to-uiverse-pink opacity-100" />
                )}
                {activeCategory !== category.id && (
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
                <span className="relative z-10">{category.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Events Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event, index) => (
                <UiverseCard
                  key={event.id}
                  delay={index * 0.1}
                  className={`h-full border-white/10 ${settings.registration_closed_events?.[event.id]
                      ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                      : event.category === 'technical'
                        ? 'hover:border-uiverse-purple/50 active-border-uiverse-purple'
                        : 'hover:border-uiverse-sky/50 active-border-uiverse-sky'
                    }`}
                >
                  <div className={`h-48 relative overflow-hidden flex items-center justify-center bg-black/40`}>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-110 contrast-125"
                    />
                    {/* Event Closed Overlay */}
                    {settings.registration_closed_events?.[event.id] && (
                      <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="px-4 py-2 bg-red-600/90 text-white font-bold rounded-lg border-2 border-red-400/50 shadow-[0_0_20px_rgba(220,38,38,0.5)] transform -rotate-6 uppercase tracking-widest text-sm">
                          Registration Closed
                        </span>
                      </div>
                    )}
                    {event.hasCashPrize && (
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-yellow-500/50 rounded-full p-2.5 z-10 shadow-[0_0_15px_rgba(234,179,8,0.5)] transition-all duration-500 group-hover:scale-125 group-hover:shadow-[0_0_30px_rgba(255,215,0,0.8)] group-hover:border-yellow-400 group-hover:bg-yellow-500/20" title="Win Cash Prizes!">
                        <IndianRupee className="w-5 h-5 text-yellow-400 group-hover:text-yellow-200" />
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border w-fit ${event.category === "technical"
                        ? "bg-uiverse-purple/10 text-uiverse-purple border-uiverse-purple/20"
                        : "bg-uiverse-sky/10 text-uiverse-sky border-uiverse-sky/20"
                        }`}
                    >
                      {event.category}
                    </span>
                    <h3 className="font-display text-2xl font-bold mb-3 text-white group-hover:text-gradient-to-r group-hover:from-white group-hover:to-gray-300">
                      {event.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                      {event.description}
                    </p>

                    <Link to={`/events/${event.id}`} className="mt-auto">
                      <UiverseButton
                        variant="secondary"
                        className="w-full justify-center !text-sm"
                      >
                        View Details
                      </UiverseButton>
                    </Link>
                  </div>
                </UiverseCard>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No events found in this category.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Events;
