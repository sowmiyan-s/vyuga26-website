import { AnimatePresence, motion } from "framer-motion";

interface FlipCardProps {
    value: string | number;
    label?: string;
    className?: string;
}

const FlipCard = ({ value, label, className = "" }: FlipCardProps) => {
    return (
        <div className={`flex flex-col items-center ${className}`}>
            <div className="relative w-20 h-24 md:w-32 md:h-40 perspective-1000">
                <div className="relative w-full h-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={value}
                            initial={{ rotateX: 90, opacity: 0 }}
                            animate={{ rotateX: 0, opacity: 1 }}
                            exit={{ rotateX: -90, opacity: 0 }}
                            transition={{
                                duration: 0.6,
                                type: "spring",
                                stiffness: 200,
                                damping: 20
                            }}
                            style={{ transformOrigin: "center center" }}
                            className="absolute inset-0 flex items-center justify-center backface-visible"
                        >
                            <span className="text-4xl md:text-7xl font-black font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-sm">
                                {String(value).padStart(2, "0")}
                            </span>
                        </motion.div>
                    </AnimatePresence>

                    {/* Glossy overlay for glass effect */}
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                    {/* Middle line for split-flap look */}
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/30 w-full z-10" />
                </div>

                {/* Reflection/Shadow underneath */}
                <div className="absolute -bottom-4 left-0 right-0 h-4 bg-black/20 blur-md rounded-full transform scale-x-90" />
            </div>

            {label && (
                <span className="mt-4 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-uiverse-sky drop-shadow-[0_0_10px_rgba(18,184,255,0.4)]">
                    {label}
                </span>
            )}
        </div>
    );
};

export default FlipCard;
