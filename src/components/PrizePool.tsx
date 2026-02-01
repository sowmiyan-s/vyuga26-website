import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/config";
import { motion, useInView } from "framer-motion";
import confetti from "canvas-confetti";
import { Trophy } from "lucide-react";

const PrizePool = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    if (isInView && !isScrambling && displayValue === "0") {
      setIsScrambling(true);
      const target = siteConfig.prizePool;
      const duration = 2000;
      const steps = 30;
      const interval = duration / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        if (step >= steps) {
          clearInterval(timer);
          setDisplayValue(target.toLocaleString("en-IN"));
          setIsScrambling(false);
          triggerConfetti();
        } else {
          // Scramble logic: show random number close to progress
          const progress = step / steps;
          const randomVal = Math.floor(target * progress + Math.random() * (target * 0.1));
          setDisplayValue(randomVal.toLocaleString("en-IN"));
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  const triggerConfetti = () => {
    const end = Date.now() + 1000;
    const colors = ['#FFD700', '#FDB931', '#FFFFFF'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <section ref={ref} className="py-20 md:py-32 px-4 relative overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">

      {/* Pulsing Glow Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 rounded-full border border-yellow-500/20"
        />
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          className="absolute inset-0 rounded-full border border-yellow-500/10"
        />
        <div className="absolute inset-0 bg-yellow-500/5 blur-[80px] rounded-full" />
      </div>

      <div className="relative z-10 text-center w-full max-w-5xl mx-auto flex flex-col items-center">

        {/* 3D Floating Trophy */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-yellow-500/30 blur-[60px] rounded-full" />

          <motion.div
            animate={{
              y: [-15, 15, -15],
              rotateZ: [-5, 5, -5],
              filter: [
                "drop-shadow(0 0 15px rgba(255,215,0,0.3))",
                "drop-shadow(0 0 30px rgba(255,215,0,0.6))",
                "drop-shadow(0 0 15px rgba(255,215,0,0.3))"
              ]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative z-10"
          >
            <Trophy size={120} strokeWidth={1} className="text-yellow-400 fill-yellow-500/20" />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-white font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-base bg-white/5 border border-white/10 py-2 px-6 rounded-full backdrop-blur-md relative overflow-hidden"
        >
          <span className="relative z-10">Total Prize Pool</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.p>

        {/* Prize Amount Wrapper */}
        <div className="relative inline-flex items-baseline justify-center font-display leading-[0.9]">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl text-yellow-500 font-medium mr-2 self-start mt-4 md:mt-6 drop-shadow-[0_0_15px_rgba(234,179,8,0.6)]"
          >
            ₹
          </motion.span>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative"
          >
            <span
              className="text-[5rem] sm:text-[8rem] md:text-[12rem] font-black tracking-tighter text-transparent bg-clip-text select-none drop-shadow-[0_0_35px_rgba(253,186,49,0.5)]"
              style={{
                backgroundImage: "linear-gradient(135deg, #FFD700 0%, #FDB931 25%, #FFFFE0 50%, #FDB931 75%, #FFD700 100%)",
                backgroundSize: "200% auto",
                animation: "shine 4s linear infinite",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              {displayValue}
            </span>

            {/* Sparkles */}
            <Sparkle style={{ top: '-10%', left: '-5%' }} delay={0} color="#FFD700" />
            <Sparkle style={{ top: '10%', right: '-5%' }} delay={1} color="#FFFACD" />
            <Sparkle style={{ bottom: '-5%', left: '20%' }} delay={2} color="#FDB931" />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-[#00FF00] mt-4 md:mt-8 text-lg md:text-2xl font-medium tracking-wide max-w-lg mx-auto drop-shadow-[0_0_10px_rgba(0,255,0,0.4)]"
        >
          Worth of exciting prizes to be won!
        </motion.p>
      </div>

      <style>{`
        @keyframes shine {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
};

const Sparkle = ({ style, delay, color }: { style: React.CSSProperties, delay: number, color: string }) => (
  <motion.div
    animate={{
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      rotate: [0, 180]
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay: delay,
      repeatDelay: 1
    }}
    className="absolute w-8 h-8 md:w-16 md:h-16 pointer-events-none"
    style={{ ...style, color: color, filter: "drop-shadow(0 0 5px currentColor)" }}
  >
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  </motion.div>
);

export default PrizePool;
