import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, IndianRupee } from "lucide-react";
import { getCashPrizeEvents } from "@/config/events";
import { UiverseButton } from "./ui/UiverseButton";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";

const SpotlightEvents = () => {
  const events = getCashPrizeEvents();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    if (events.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 3000); // Faster interval as requested (3s)

    return () => clearInterval(timer);
  }, [events.length, isPaused]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const getVisibleEvents = () => {
    if (events.length === 0) return [];

    // Handle cases where we have fewer events than the carousel expects
    if (events.length < 3) {
      const visible = [];
      for (let i = -1; i <= 1; i++) {
        let index = (currentIndex + i + events.length) % events.length;
        visible.push({ event: events[index], offset: i, key: `${events[index].id}-${i}` });
      }
      return visible;
    }

    const visible = [];
    for (let i = -1; i <= 1; i++) {
      let index = (currentIndex + i + events.length) % events.length;
      // Use event.id as key to allow Framer Motion to animate position changes for the same card
      visible.push({ event: events[index], offset: i, key: events[index].id });
    }
    return visible;
  };

  if (events.length === 0) return null;

  return (
    <MotionConfig reducedMotion="never" transition={{ duration: 0.8 }}>
      <section className="py-24 px-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-yellow-400 text-sm tracking-[0.3em] uppercase mb-3 font-bold"
            >
              Win Big
            </motion.p>
            <motion.h2
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="font-display text-4xl md:text-5xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]"
            >
              Cash Prize Events
            </motion.h2>
          </div>

          <div className="relative h-[600px] flex items-center justify-center perspective-[2000px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}>

            {/* Navigation Arrows - Glassmorphism */}
            <button
              onClick={goToPrev}
              className="absolute left-2 md:left-8 z-30 w-14 h-14 rounded-full bg-black/20 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all backdrop-blur-xl group shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            >
              <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 md:right-8 z-30 w-14 h-14 rounded-full bg-black/20 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all backdrop-blur-xl group shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            >
              <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* 3D Carousel Container */}
            <div className="relative w-full h-[500px] flex justify-center items-center">

              <AnimatePresence mode="popLayout" initial={false}>
                {getVisibleEvents().map(({ event, offset, key }) => {
                  const isActive = offset === 0;

                  return (
                    <motion.div
                      key={key}
                      layout
                      initial={{
                        scale: 0.8,
                        opacity: 0,
                        x: offset * 400, // Distance for entry
                        z: -200,
                        rotateY: offset * -25
                      }}
                      animate={{
                        scale: isActive ? 1.05 : 0.85, // Active card slightly larger (Hero effect)
                        opacity: isActive ? 1 : 0.5,
                        x: offset * (window.innerWidth < 768 ? 80 : 450), // Responsive spread
                        zIndex: isActive ? 50 : 10,
                        z: isActive ? 100 : -100, // Active brings forward, others push back
                        rotateY: offset * -15,   // Gentle 3D turn
                        rotateX: isActive ? 0 : 5, // Slight tilt for depth
                        filter: isActive ? "blur(0px) brightness(1.1)" : "blur(4px) brightness(0.6)"
                      }}
                      exit={{ scale: 0.7, opacity: 0, z: -300, transition: { duration: 0.3 } }}
                      transition={{
                        duration: 0.8,
                        type: "spring",
                        stiffness: 120, // Snappy spring
                        damping: 14,    // Less friction for elastic bounce
                        mass: 1.2
                      }}
                      className="absolute w-[280px] md:w-[380px] cursor-grab active:cursor-grabbing"
                    >
                      {/* Card Container - Premium Glass */}
                      <div className={`
                    relative rounded-3xl overflow-hidden backdrop-blur-3xl transition-all duration-500 h-full border
                    ${isActive
                          ? 'bg-black/40 border-yellow-500/50 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(234,179,8,0.2)]'
                          : 'bg-black/60 border-white/5 shadow-xl'}
                  `}>

                        {/* Image Section */}
                        <div className="relative overflow-hidden group min-h-[220px]">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />
                          <motion.img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-contain bg-black/50"
                            animate={{ scale: isActive ? 1.05 : 1 }}
                            transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
                          />

                          {/* Floating Badge */}
                          <div className="absolute top-4 left-4 z-20">
                            <span className={`px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-lg ${isActive ? 'text-yellow-400 border-yellow-500/50' : 'text-white border-white/10'
                              }`}>
                              {event.category}
                            </span>
                          </div>

                          {/* Cash Prize Icon */}
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              className="absolute top-4 right-4 z-20 bg-yellow-500 text-black p-2 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.8)]"
                            >
                              <IndianRupee className="w-5 h-5 font-bold" />
                            </motion.div>
                          )}
                        </div>

                        {/* Content Section */}
                        <div className="p-6 md:p-8 relative z-20 -mt-10">
                          <motion.h3
                            layout="position"
                            className={`font-display text-2xl md:text-3xl font-bold mb-3 text-shadow-lg leading-tight ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-200' : 'text-white'
                              }`}
                          >
                            {event.title}
                          </motion.h3>

                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isActive ? 1 : 0.7 }}
                            className="text-gray-300 text-sm md:text-base mb-6 line-clamp-2 leading-relaxed"
                          >
                            {event.description}
                          </motion.p>

                          <div className="flex items-center justify-between mt-auto">
                            <Link to={`/events/${event.id}`}
                              className={`w-full group/btn ${!isActive ? 'pointer-events-none' : ''}`}
                              title={`View details for ${event.title} - Cash Prize Event`}
                              aria-label={`View details for ${event.title}`}>
                              <div className={`relative overflow-hidden rounded-xl bg-white text-black font-bold py-3 px-6 text-center text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] ${isActive ? 'hover:bg-yellow-400 hover:text-black hover:shadow-[0_0_30px_rgba(234,179,8,0.6)]' : ''
                                }`}>
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                  View Details <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </span>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Cinematic Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <motion.div
                key={currentIndex}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
                className="h-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]"
              />
            </div>

          </div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default SpotlightEvents;
