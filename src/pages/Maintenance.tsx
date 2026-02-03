import { ChefHat, Timer, Users, Info } from "lucide-react";
import { siteConfig } from "@/config/config";
import { motion } from "framer-motion";

const Maintenance = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white overflow-hidden relative p-4">
            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-uiverse-purple/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-uiverse-sky/20 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl w-full relative z-10"
            >
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] text-center relative overflow-hidden group">

                    {/* Subtle Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-uiverse-purple/5 to-uiverse-sky/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                        className="w-24 h-24 mx-auto mb-8 relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-uiverse-purple to-uiverse-sky blur-2xl opacity-40 animate-pulse" />
                        <div className="relative bg-gradient-to-br from-[#1a1a1a] to-black rounded-full w-full h-full flex items-center justify-center border border-white/10 shadow-2xl">
                            <ChefHat className="w-10 h-10 text-white" />
                        </div>
                    </motion.div>

                    {/* Main Content */}
                    <h1 className="font-display text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-6 tracking-tight">
                        We are Cooking Something Cool
                    </h1>

                    <div className="space-y-4 mb-10">
                        <p className="text-xl text-gray-300 font-light leading-relaxed">
                            Our digital chefs are busy preparing a fresh new experience for you.
                        </p>
                        <div className="text-sm text-gray-400 italic bg-white/5 inline-block px-4 py-2 rounded-full border border-white/5">
                            "Temporarily closed for a professional upgrade. Serving soon!"
                        </div>
                    </div>

                    {/* Info Card */}
                    <div className="grid md:grid-cols-2 gap-4 mb-10">
                        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4 text-left hover:bg-white/10 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-uiverse-sky/20 flex items-center justify-center flex-shrink-0">
                                <Timer className="w-5 h-5 text-uiverse-sky" />
                            </div>
                            <div>
                                <p className="font-bold text-white text-sm">Be Back Soon</p>
                                <p className="text-xs text-gray-400">Final touches in progress</p>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4 text-left hover:bg-white/10 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-uiverse-purple/20 flex items-center justify-center flex-shrink-0">
                                <Users className="w-5 h-5 text-uiverse-purple" />
                            </div>
                            <div>
                                <p className="font-bold text-white text-sm">Stay Tuned</p>
                                <p className="text-xs text-gray-400">We are working professionaly</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href={siteConfig.whatsappGroupLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-uiverse-green/10 hover:bg-uiverse-green/20 text-uiverse-green border border-uiverse-green/20 hover:border-uiverse-green/50 transition-all duration-300 font-medium group"
                        >
                            <span className="w-2 h-2 rounded-full bg-uiverse-green animate-pulse" />
                            Join Updates
                        </a>
                        <a
                            href="/"
                            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/30 transition-all duration-300 font-medium"
                        >
                            Check Again
                        </a>
                    </div>

                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 text-xs mt-8 flex items-center justify-center gap-2">
                    <Info className="w-3 h-3" />
                    Crafting a better experience for you.
                </p>

            </motion.div>
        </div>
    );
};

export default Maintenance;
