import { useParams, Link } from "react-router-dom";
import { getEventById } from "@/config/events";
import { getCoordinatorsByEventId } from "@/config/coordinators";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { UiverseButton } from "@/components/ui/UiverseButton";
import { UiverseCard } from "@/components/ui/UiverseCard";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const event = id ? getEventById(id) : undefined;
  const coordinators = id ? getCoordinatorsByEventId(id) : [];

  if (!event) {
    return (
      <div className="min-h-screen bg-transparent text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Event Not Found</h1>
          <Link to="/events">
            <UiverseButton>Back to Events</UiverseButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-uiverse-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-uiverse-sky/10 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="pt-32 pb-20 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Events
          </Link>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl overflow-hidden mb-12 border border-white/10 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-uiverse-purple/20 via-black to-uiverse-sky/20 opacity-50" />
            <div className="h-64 md:h-96 relative flex items-center justify-center overflow-hidden rounded-3xl border-4 border-uiverse-purple/40 shadow-2xl">
              <img
                src={event.image}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover brightness-125 contrast-150 drop-shadow-2xl scale-105 transition-transform duration-700"
                style={{ zIndex: 1 }}
              />
              {/* Removed fade overlay for full image visibility */}
            </div>

            <div className="p-8 md:p-12 relative bg-black/40 backdrop-blur-xl">
              <span
                className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6 border ${event.category === "technical"
                  ? "bg-uiverse-purple/10 text-uiverse-purple border-uiverse-purple/20"
                  : event.category === "non-technical"
                    ? "bg-uiverse-sky/10 text-uiverse-sky border-uiverse-sky/20"
                    : "bg-uiverse-orange/10 text-uiverse-orange border-uiverse-orange/20"
                  }`}
              >
                {event.category}
              </span>
              <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                {event.title}
              </h1>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl">{event.fullDescription}</p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Rules */}
            <UiverseCard className="p-8 h-full border-white/10">
              <h2 className="font-display text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Rules</h2>
              <ul className="space-y-4">
                {event.rules.map((rule, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-white group-hover:bg-uiverse-sky/20 group-hover:text-uiverse-sky group-hover:border-uiverse-sky/50 transition-all">
                      {index + 1}
                    </span>
                    <span className="text-gray-400 group-hover:text-gray-200 transition-colors pt-1 leading-relaxed">{rule}</span>
                  </motion.li>
                ))}
              </ul>
            </UiverseCard>

            {/* Event Info */}
            <div className="space-y-8">
              {/* Time */}
              <UiverseCard className="p-8 border-white/10">
                <h2 className="font-display text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-uiverse-green to-emerald-300">
                  Time
                </h2>
                <div className="flex items-center gap-3 text-xl text-gray-300">
                  <span className="text-2xl">⏰</span>
                  {event.time}
                </div>
              </UiverseCard>

              {/* Coordinators */}
              <UiverseCard className="p-8 border-white/10">
                <h2 className="font-display text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-uiverse-orange to-uiverse-pink">
                  Coordinators
                </h2>
                <div className="space-y-4">
                  {coordinators.map((coordinator, index) => (
                    <motion.div
                      key={coordinator.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-uiverse-sky/30 hover:bg-white/10 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-uiverse-sky/20 to-uiverse-purple/20 flex items-center justify-center border border-white/10">
                        <span className="font-display text-lg font-bold text-white group-hover:scale-110 transition-transform">
                          {coordinator.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-white mb-1">{coordinator.name}</p>
                        {(coordinator.year || coordinator.section) && (
                          <p className="text-xs text-gray-300 mb-1">
                            {coordinator.year ? `III` : ""} AIDS{coordinator.section ? ` - ${coordinator.section}` : ""}
                          </p>
                        )}
                        {coordinator.phone && (
                          <a
                            href={`https://wa.me/91${coordinator.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-uiverse-sky hover:text-white transition-colors flex items-center gap-1"
                          >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            {coordinator.phone}
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </UiverseCard>
            </div>
          </div>

          {/* Register CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
          >
            <Link to="/register">
              <UiverseButton
                variant="primary"
                className="text-xl px-12 py-6 shadow-[0_0_30px_rgba(223,25,251,0.3)] hover:shadow-[0_0_50px_rgba(223,25,251,0.6)]"
              >
                Register for this Event
              </UiverseButton>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default EventDetail;
