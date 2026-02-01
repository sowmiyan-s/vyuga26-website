import { getPreRegistrationEvents } from "@/config/events";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, Lightbulb, Rocket } from "lucide-react";
import { UiverseCard } from "@/components/ui/UiverseCard";

const PreRegistrationEvents = () => {
    const events = getPreRegistrationEvents();

    if (events.length === 0) return null;

    return (
        <section className="py-24 px-4 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-uiverse-sky/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-uiverse-sky text-sm tracking-[0.2em] uppercase mb-3 font-bold"
                    >
                        Showcase Your Innovation
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-display text-4xl md:text-5xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    >
                        Pre-registering Events
                    </motion.h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm md:text-base">
                        Submit your ideas now! These events require abstract submission and shortlisting before payment.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <Link to={`/events/${event.id}`} className="group block h-full">
                                <UiverseCard className="h-full border-white/10 group-hover:border-uiverse-sky/50 transition-all duration-300 relative overflow-hidden">

                                    {/* Floating Badge */}
                                    <div className="absolute top-4 right-4 z-20">
                                        <span className="px-3 py-1 bg-uiverse-sky/20 border border-uiverse-sky/40 text-uiverse-sky text-xs font-bold uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(18,184,255,0.3)] backdrop-blur-md">
                                            Free Submission
                                        </span>
                                    </div>

                                    <div className="flex flex-col h-full">
                                        {/* Image Header */}
                                        <div className="relative aspect-video overflow-hidden rounded-xl mb-6 border border-white/5 bg-black/50">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-lg bg-uiverse-sky/10 flex items-center justify-center text-uiverse-sky">
                                                    {event.id === 'ideathon' ? <Lightbulb className="w-5 h-5" /> : <Rocket className="w-5 h-5" />}
                                                </div>
                                                <h3 className="font-display text-2xl font-bold text-white group-hover:text-uiverse-sky transition-colors">
                                                    {event.title}
                                                </h3>
                                            </div>

                                            <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                                                {event.description}
                                            </p>

                                            {/* Important Note */}
                                            <div className="mt-auto bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                                                <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-gray-300 text-xs font-bold mb-1">Pay only if shortlisted</p>
                                                    <p className="text-gray-500 text-[10px]">
                                                        Submit details via Google Form first. Payment link shared with selected teams later.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-6 flex items-center text-uiverse-sky font-bold text-sm uppercase tracking-wider group-hover:gap-2 transition-all">
                                                View Details & Submit <ArrowRight className="w-4 h-4 ml-2" />
                                            </div>
                                        </div>
                                    </div>
                                </UiverseCard>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PreRegistrationEvents;
