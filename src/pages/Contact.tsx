import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { UiverseCard } from "@/components/ui/UiverseCard";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone, User } from "lucide-react";
import { getChiefCoordinators } from "@/config/coordinators";

const Contact = () => {
    const chiefCoordinators = getChiefCoordinators();

    return (
        <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
            <Navbar />

            <main className="pt-32 pb-20 px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-display text-3xl sm:text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-uiverse-purple via-white to-uiverse-sky drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-6"
                        >
                            Contact Us
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                        >
                            For help, queries about the event, or bulk registration (more than 5), kindly contact us via the information below.
                        </motion.p>
                    </div>

                    <div className="space-y-16">
                        {/* General Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center justify-center gap-2">
                                <Mail className="text-uiverse-sky" /> General Enquiries
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <UiverseCard className="p-6 flex flex-col items-center text-center gap-4 hover:border-uiverse-purple/50 group cursor-pointer" delay={0.1}>
                                    <a href="mailto:vyuga2026@gmail.com" className="w-full h-full flex flex-col items-center">
                                        <div className="p-4 rounded-full bg-uiverse-purple/10 text-uiverse-purple group-hover:scale-110 transition-transform mb-2">
                                            <Mail className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-1">Email Us</h3>
                                        <p className="text-gray-400 text-sm mb-4">For general queries & bulk registration</p>
                                        <span className="text-lg font-medium tracking-wide text-uiverse-purple group-hover:underline decoration-uiverse-purple/50 underline-offset-4">vyuga2026@gmail.com</span>
                                    </a>
                                </UiverseCard>

                                <UiverseCard className="p-6 flex flex-col items-center text-center gap-4 hover:border-[#25D366]/50 group cursor-pointer" delay={0.2}>
                                    <a href="https://chat.whatsapp.com/your-group-link" target="_blank" rel="noopener noreferrer" className="w-full h-full flex flex-col items-center">
                                        <div className="p-4 rounded-full bg-[#25D366]/10 text-[#25D366] group-hover:scale-110 transition-transform mb-2">
                                            <MessageCircle className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-1">WhatsApp Group</h3>
                                        <p className="text-gray-400 text-sm mb-4">Join for instant updates & community</p>
                                        <span className="text-lg font-medium tracking-wide text-[#25D366] group-hover:underline decoration-[#25D366]/50 underline-offset-4">Join Community</span>
                                    </a>
                                </UiverseCard>
                            </div>
                        </motion.div>

                        {/* Main Coordinators */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-2xl font-bold text-white mb-8 flex items-center justify-center gap-2">
                                <User className="text-uiverse-green" /> Main Coordinators
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {chiefCoordinators.map((coordinator, idx) => (
                                    <UiverseCard key={coordinator.id} delay={0.4 + (idx * 0.1)} className="p-6 flex items-center gap-6 group hover:border-uiverse-green/50">
                                        <div className="w-16 h-16 rounded-full bg-uiverse-green/10 flex items-center justify-center text-uiverse-green shrink-0 group-hover:scale-110 transition-transform border border-uiverse-green/20">
                                            <User className="w-8 h-8" />
                                        </div>
                                        <div className="flex-1 overflow-hidden text-left">
                                            <h3 className="font-bold text-xl text-white mb-1 truncate group-hover:text-uiverse-green transition-colors">{coordinator.name}</h3>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm text-gray-400 font-medium">{coordinator.department}</p>
                                                <a href={`tel:${coordinator.phone}`} className="inline-flex items-center gap-2 text-sm font-bold text-uiverse-sky hover:text-white transition-colors mt-1 w-fit">
                                                    <Phone className="w-3.5 h-3.5" />
                                                    {coordinator.phone}
                                                </a>
                                            </div>
                                        </div>
                                    </UiverseCard>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                </div>
            </main>

            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default Contact;
