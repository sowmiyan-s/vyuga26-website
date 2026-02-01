import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GradientOrbsProps {
  className?: string;
}

const GradientOrbs = ({ className = '' }: GradientOrbsProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMounted, setIsMounted] = useState(false);

  // Smooth springs for orb movement
  const springConfig = { damping: 50, stiffness: 50 };
  const orb1X = useSpring(useTransform(mouseX, (x) => x * 0.02), springConfig);
  const orb1Y = useSpring(useTransform(mouseY, (y) => y * 0.02), springConfig);
  const orb2X = useSpring(useTransform(mouseX, (x) => x * -0.015), springConfig);
  const orb2Y = useSpring(useTransform(mouseY, (y) => y * -0.015), springConfig);
  const orb3X = useSpring(useTransform(mouseX, (x) => x * 0.01), springConfig);
  const orb3Y = useSpring(useTransform(mouseY, (y) => y * 0.025), springConfig);

  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`} style={{ zIndex: 0 }}>
      {/* Primary Purple Orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, hsla(270, 80%, 50%, 0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
          left: '10%',
          top: '20%',
          x: orb1X,
          y: orb1Y,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Cyan Accent Orb */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsla(180, 100%, 50%, 0.3) 0%, transparent 70%)',
          filter: 'blur(50px)',
          right: '15%',
          top: '10%',
          x: orb2X,
          y: orb2Y,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Pink/Magenta Orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, hsla(320, 80%, 55%, 0.35) 0%, transparent 70%)',
          filter: 'blur(55px)',
          right: '25%',
          bottom: '10%',
          x: orb3X,
          y: orb3Y,
        }}
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Subtle Orange Accent */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, hsla(25, 100%, 55%, 0.3) 0%, transparent 70%)',
          filter: 'blur(45px)',
          left: '30%',
          bottom: '20%',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default GradientOrbs;
