import React from 'react';
import Pattern from './Pattern';
import ParticleField from './effects/ParticleField';
import GradientOrbs from './effects/GradientOrbs';

const BackgroundWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative min-h-screen w-full bg-black overflow-hidden">
            <Pattern />
            <GradientOrbs />
            <ParticleField particleCount={40} className="hidden md:block" />
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};

export default BackgroundWrapper;
