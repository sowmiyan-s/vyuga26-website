import { useEffect, useState } from "react";
import { siteConfig } from "@/config/config";
import { motion, AnimatePresence } from "framer-motion";
import FlipCard from "./effects/FlipCard";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +siteConfig.eventDateFull - +new Date();

      // Check urgency (less than 3 days)
      if (difference < 3 * 24 * 60 * 60 * 1000) {
        setIsUrgent(true);
      }

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="py-20 px-4 relative flex justify-center items-center overflow-hidden">
      {/* Dynamic Background Pulse for Urgency */}
      {isUrgent && (
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-red-900/20 blur-[100px] z-0 pointer-events-none"
        />
      )}

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className={`inline-block px-4 py-2 rounded-full border ${isUrgent ? 'border-red-500/50 text-red-400 bg-red-900/20' : 'border-white/10 text-white/70 bg-white/5'} backdrop-blur-md text-sm font-bold tracking-[0.2em] uppercase shadow-lg`}>
            {isUrgent ? "Time is running out!" : "Event Starts In"}
          </span>
        </motion.div>

        <div className="flex flex-nowrap justify-center gap-2 sm:gap-4 md:gap-8 lg:gap-12 scale-90 sm:scale-100 origin-center">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{
                delay: index * 0.15,
                type: "spring",
                bounce: 0.4
              }}
              className="relative"
            >
              {/* 3D Perspective Container */}
              <FlipCard value={unit.value} label={unit.label} />

              {/* Subtle particle ticks for seconds */}
              {unit.label === "Seconds" && (
                <motion.div
                  key={unit.value}
                  initial={{ scale: 1.5, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  className="absolute inset-0 border border-uiverse-sky/30 rounded-2xl pointer-events-none"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;
