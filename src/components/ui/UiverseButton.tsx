import React from 'react';

interface UiverseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
}

export const UiverseButton: React.FC<UiverseButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
    return (
        <button
            className={`group relative overflow-hidden px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95
        ${variant === 'primary'
                    ? 'bg-gradient-to-r from-uiverse-purple to-uiverse-sky text-white shadow-[0_0_20px_rgba(223,25,251,0.5)] hover:shadow-[0_0_40px_rgba(18,184,255,0.6)]'
                    : variant === 'secondary'
                        ? 'bg-gradient-to-r from-uiverse-orange to-uiverse-pink text-white shadow-[0_0_20px_rgba(255,110,45,0.5)] hover:shadow-[0_0_40px_rgba(253,68,153,0.6)]'
                        : 'bg-transparent border-2 border-uiverse-green text-uiverse-green hover:bg-uiverse-green/10 shadow-[0_0_10px_rgba(1,220,3,0.3)] hover:shadow-[0_0_30px_rgba(1,220,3,0.6)]'
                }
        ${className}
      `}
            {...props}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/20 transition-transform duration-300 skew-x-12" />
        </button>
    );
};
