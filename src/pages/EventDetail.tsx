import { useParams, Link } from "react-router-dom";
import { getEventById } from "@/config/events";
import { getCoordinatorsByEventId } from "@/config/coordinators";
import { useSettings } from "@/hooks/useSettings"; // Import hook
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { UiverseButton } from "@/components/ui/UiverseButton";
import { UiverseCard } from "@/components/ui/UiverseCard";
import { ArrowLeft, IndianRupee, Clock, Trophy, AlertTriangle, Rocket, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { settings } = useSettings(); // Use hook
  const event = id ? getEventById(id) : undefined;
  const coordinators = id ? getCoordinatorsByEventId(id) : [];

  const isEventClosed = id && settings.registration_closed_events?.[id]; // Check status

  if (!event) {
    return (
      <div className="min-h-screen bg-transparent text-white flex items-center justify-center">
        <SEO title="Event Not Found" description="The requested event could not be found." />
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
      <SEO
        title={event.title}
        description={event.fullDescription.substring(0, 160) + "..."}
        image={event.image}
        url={window.location.href}
      />
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-uiverse-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-uiverse-sky/10 rounded-full blur-120px pointer-events-none" />

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

            <div className="p-8 md:p-12 relative bg-black/40 backdrop-blur-xl flex flex-col items-center text-center">
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

          {/* Pre-Registration Flow - Only for Ideathon & Startup Arena */}
          {/* Pre-Registration Flow - Only if enabled (e.g., Ideathon & Startup Arena) */}
          {event.isPreRegistration && event.showParticipationProcess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h2 className="font-display text-3xl font-bold mb-6 text-center text-white">Participation Process</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Step 1: Free Submission", desc: "Submit your abstract/PPT and team details via Google Form for free." },
                  { title: "Step 2: Evaluation", desc: "Our expert panel will review all submissions based on innovation and feasibility." },
                  { title: "Step 3: Shortlisting", desc: "Only shortlisted teams will be contacted via email/WhatsApp to proceed with payment." }
                ].map((step, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:bg-white/10 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 font-display text-6xl font-bold">{idx + 1}</div>
                    <div className="relative z-10">
                      <h3 className="font-bold text-xl text-uiverse-sky mb-2">{step.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

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
              {/* Prize Pool */}
              {event.hasCashPrize && (
                <UiverseCard className="p-8 border-white/10 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-yellow-500/10 blur-[50px] pointer-events-none group-hover:bg-yellow-500/20 transition-colors" />
                  <div className="relative z-10">
                    <h2 className="font-display text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-600 flex items-center gap-3">
                      <IndianRupee className="w-8 h-8 text-yellow-500" />
                      Prize Pool
                    </h2>
                    <p className="text-xl text-gray-300">
                      Exciting cash prizes await the winners!
                      <span className="text-sm text-yellow-500/80 mt-2 font-mono flex items-center gap-2"><Trophy className="w-4 h-4" /> Win Big with {event.title}</span>
                    </p>
                  </div>
                </UiverseCard>
              )}

              {/* Time */}
              <UiverseCard className="p-8 border-white/10">
                <h2 className="font-display text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-uiverse-green to-emerald-300">
                  Time
                </h2>
                <div className="flex items-center gap-3 text-xl text-gray-300">
                  <Clock className="w-7 h-7 text-white" />
                  {event.time}
                </div>
              </UiverseCard>

              {/* Venue */}
              {event.venue && (
                <UiverseCard className="p-8 border-white/10">
                  <h2 className="font-display text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-uiverse-purple to-purple-300">
                    Venue
                  </h2>
                  <div className="flex items-center gap-3 text-xl text-gray-300">
                    <MapPin className="w-7 h-7 text-white" />
                    {event.venue}
                  </div>
                </UiverseCard>
              )}

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
                        <p className="text-xs text-gray-300 mb-1">
                          {coordinator.department}
                        </p>
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
            {isEventClosed ? (
              <div className="flex flex-col items-center gap-6">
                <div className="p-6 rounded-2xl bg-red-500/10 border-2 border-red-500/50 text-center max-w-lg mx-auto shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                  <h3 className="text-2xl font-bold text-red-500 mb-2 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    Registration Closed
                  </h3>
                  <p className="text-gray-400">
                    Registration for {event.title} is officially closed. Thank you for your interest!
                  </p>
                </div>
              </div>
            ) : (
              // Original Logic
              <>
                {event.isPreRegistration ? (
                  <div className="flex flex-col items-center gap-6">
                    <a
                      href={event.submissionLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <UiverseButton
                        variant="primary"
                        className="text-xl px-12 py-6 shadow-[0_0_30px_rgba(18,184,255,0.3)] hover:shadow-[0_0_50px_rgba(18,184,255,0.6)] !bg-gradient-to-r !from-uiverse-sky !to-blue-600"
                      >
                        {event.registrationButtonLabel || "Submit PPT (Free)"} <Rocket className="w-5 h-5 ml-2" />
                      </UiverseButton>
                    </a>

                    <div className="max-w-2xl mx-auto p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                      <p className="text-yellow-200 text-sm font-medium">
                        <span className="flex items-center gap-2 mb-1"><AlertTriangle className="w-4 h-4" /> <span className="underline">IMPORTANT:</span></span> Payment details and event passes will be shared <strong className="text-white">only with shortlisted teams</strong> via email/WhatsApp.
                      </p>
                      <p className="text-yellow-200/70 text-xs mt-1">
                        Direct payments made without selection confirmation are invalid and will not be refunded.
                      </p>
                    </div>
                  </div>
                ) : (
                  <Link to="/register">
                    <UiverseButton
                      variant="primary"
                      className="text-xl px-12 py-6 shadow-[0_0_30px_rgba(223,25,251,0.3)] hover:shadow-[0_0_50px_rgba(223,25,251,0.6)]"
                    >
                      Register for this Event
                    </UiverseButton>
                  </Link>
                )}
              </>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default EventDetail;
