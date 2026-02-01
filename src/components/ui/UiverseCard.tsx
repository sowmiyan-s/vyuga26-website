import React from 'react';
import { motion } from 'framer-motion';

interface UiverseCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export const UiverseCard: React.FC<UiverseCardProps> = ({ children, className = '', delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={`
        relative group overflow-hidden rounded-2xl bg-black/40 border border-white/10 
        backdrop-blur-xl transition-all duration-300 hover:border-uiverse-sky/50
        hover:shadow-[0_0_30px_rgba(18,184,255,0.15)]
        ${className}
      `}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-uiverse-purple/10 to-uiverse-sky/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <div className="relative z-10 h-full flex flex-col">
                {children}
            </div>
        </motion.div>
    );
};
