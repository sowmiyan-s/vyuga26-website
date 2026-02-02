import { siteConfig } from "@/config/config";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "./effects/TextReveal";
import { Brain, Cpu, Database, Network, Code, Globe, Zap, Server } from "lucide-react";

const HeroBackground = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate1 = useTransform(scrollY, [0, 500], [0, 90]);
  const rotate2 = useTransform(scrollY, [0, 500], [0, -90]);

  const icons = [
    { Icon: Brain, x: "10%", y: "20%", size: 48, delay: 0 },
    { Icon: Cpu, x: "85%", y: "15%", size: 56, delay: 1 },
    { Icon: Database, x: "15%", y: "70%", size: 40, delay: 2 },
    { Icon: Network, x: "80%", y: "65%", size: 64, delay: 0.5 },
    { Icon: Code, x: "5%", y: "40%", size: 32, delay: 1.5 },
    { Icon: Globe, x: "90%", y: "35%", size: 48, delay: 2.5 },
    { Icon: Zap, x: "25%", y: "85%", size: 36, delay: 1 },
    { Icon: Server, x: "70%", y: "80%", size: 42, delay: 0.8 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic Gradient Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="hidden md:block absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-uiverse-purple/20 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="hidden md:block absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-uiverse-sky/20 rounded-full blur-[100px]"
      />

      {/* Kinetic Data Rings */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 md:opacity-20">
        <motion.div
          style={{ rotate: rotate1 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-[2px] border-dashed border-uiverse-purple rounded-full"
        />
        <motion.div
          style={{ rotate: rotate2 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[100px] border-[1px] border-dashed border-uiverse-sky rounded-full"
        />
      </div>

      {/* 3D Floating Assets (Generated & Centered) */}



      {/* Floating Tech Matrix */}
      {icons.map(({ Icon, x, y, size, delay }, index) => (
        <motion.div
          key={index}
          className="hidden md:block absolute text-white/10"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1],
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 5 + Math.random() * 2,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Icon size={size} strokeWidth={1} />
        </motion.div>
      ))}

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent text-white">
      <HeroBackground />
      {/* Content */}
      <div className="relative z-30 text-center px-4 max-w-6xl mx-auto">
        {/* Department Name - Clean & Floating */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 relative"
        >
          <p className="font-script text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-uiverse-sky via-white to-uiverse-purple neon-script-glow tracking-wide">
            {siteConfig.departmentName}
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "anticipate" }}
          className="relative"
        >
          {/* Main Title with Letter Reveal */}
          <h1
            className="font-display text-7xl sm:text-8xl md:text-[10rem] font-black tracking-tighter text-white mix-blend-screen glitch-text"
            data-text={siteConfig.eventName}
          >
            <TextReveal
              text={siteConfig.eventName}
              delay={0.3}
              staggerChildren={0.08}
            />
          </h1>

          {/* Glowing underline effect */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
            className="h-1 mx-auto mt-4 rounded-full"
            style={{
              width: '60%',
              background: 'linear-gradient(90deg, transparent, hsl(270, 80%, 60%), hsl(180, 100%, 50%), hsl(270, 80%, 60%), transparent)',
              boxShadow: '0 0 20px hsla(270, 80%, 60%, 0.5)',
            }}
          />
        </motion.div>

        {/* Grand Date Display */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col items-center justify-center relative mt-8"
        >
          {/* Decorative Side Lines */}
          <motion.div
            className="flex items-center gap-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="h-[2px] bg-gradient-to-r from-transparent to-primary hidden md:block"
            />
            <p className="text-4xl md:text-6xl font-bold text-white font-display tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
              {siteConfig.eventDate}
            </p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="h-[2px] bg-gradient-to-l from-transparent to-accent hidden md:block"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="text-uiverse-sky/80 font-tech uppercase tracking-[0.5em] text-sm mt-3"
          >
            Mark the Date
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
