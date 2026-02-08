import { useRef, useState } from "react";
import { Instagram, Linkedin, Github } from "lucide-react";

const DeveloperCard = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative w-[320px] h-[270px] rounded-[10px] p-[1px] bg-[radial-gradient(circle_230px_at_0%_0%,#ffffff,#0c0d0d)] overflow-hidden hover:scale-105 transition-transform duration-500 z-30"
        >
            {/* Golden Spark Mouse Effect */}
            <div
                className="pointer-events-none absolute -inset-px transition duration-300 z-20"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 215, 0, 0.15), transparent 40%)`,
                }}
            />
            <div
                className="pointer-events-none absolute inset-0 z-20 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(40px circle at ${position.x}px ${position.y}px, rgba(255, 215, 0, 0.8), transparent 100%)`,
                    filter: "blur(20px)",
                }}
            />

            {/* Inner Card */}
            <div className="relative w-full h-full rounded-[9px] border border-[#202222] bg-[#0c0d0d] bg-[radial-gradient(circle_280px_at_0%_0%,#444444,#0c0d0d)] flex flex-col items-center justify-center text-white z-[1] overflow-hidden">

                {/* Ray of Light - Static */}
                <div className="absolute w-[220px] h-[45px] rounded-full bg-[#c7c7c7] opacity-40 shadow-[0_0_50px_#fff] blur-[10px] rotate-[40deg] origin-[10%] top-0 left-0 pointer-events-none" />

                {/* Decorative Lines */}
                <div className="absolute top-[10%] w-full h-[1px] bg-[linear-gradient(90deg,#888888_30%,#1d1f1f_70%)]" />
                <div className="absolute left-[10%] w-[1px] h-full bg-[linear-gradient(180deg,#747474_30%,#222424_70%)]" />
                <div className="absolute bottom-[10%] w-full h-[1px] bg-[#2c2c2c]" />
                <div className="absolute right-[10%] w-[1px] h-full bg-[#2c2c2c]" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold font-mono text-gray-400/80">Designed by</span>

                    <h3 className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 pb-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                        Sowmiyan S
                    </h3>

                    <div className="flex items-center gap-4 mt-2">
                        <a
                            href="https://www.instagram.com/sowmiyan-s"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors hover:scale-110 duration-300"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/sowmiyan-s"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors hover:scale-110 duration-300"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>

                        <a
                            href="https://github.com/sowmiyan-s"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors hover:scale-110 duration-300"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeveloperCard;
