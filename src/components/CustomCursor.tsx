import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
}

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const location = useLocation();

  // Smooth spring for the cursor movement to reduce jitter
  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>();
  const prevMousePos = useRef({ x: -100, y: -100 });
  const mouseVelocity = useRef({ x: 0, y: 0 });

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Realtime Physics Constants
  const GRAVITY = 0.5;
  const DRAG = 0.95;
  const SPARK_LIFE_DECAY = 0.03;

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      mouseVelocity.current = {
        x: e.clientX - prevMousePos.current.x,
        y: e.clientY - prevMousePos.current.y
      };
      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Canvas & Physics Loop
  useEffect(() => {
    if (isMobile || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- SPAWN LOGIC ---
      const speed = Math.sqrt(mouseVelocity.current.x ** 2 + mouseVelocity.current.y ** 2);
      const isMoving = speed > 0.5;

      if (isMoving || Math.random() < 0.3) {
        const count = isMoving ? Math.min(8, Math.ceil(speed / 3)) : 1;

        for (let i = 0; i < count; i++) {
          const offsetX = (Math.random() - 0.5) * 15;
          const offsetY = (Math.random() - 0.5) * 15;

          particlesRef.current.push({
            x: prevMousePos.current.x + offsetX,
            y: prevMousePos.current.y + offsetY,
            vx: (Math.random() - 0.5) * 6 + (mouseVelocity.current.x * -0.1),
            vy: (Math.random() - 0.5) * 6 + (Math.random() * 2),
            life: 1.0,
            size: Math.random() * 3 + 1,
            color: '255, 255, 255'
          });
        }
      }

      // --- PHYSICS & DRAW LOOP ---
      // Filter in place
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];

        p.x += p.vx;
        p.y += p.vy;
        p.vy += GRAVITY * 1.5; // Gravity
        p.vx *= DRAG;
        p.vy *= DRAG;
        p.life -= SPARK_LIFE_DECAY;

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.life})`;

        // Glow effect
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = `rgba(${p.color}, ${p.life})`;

        ctx.fill();
        ctx.shadowBlur = 0; // Reset for performance if needed, but per-particle shadow is key for the look
      }

      // Cap particles
      if (particlesRef.current.length > 300) {
        particlesRef.current = particlesRef.current.slice(-300);
      }

      // Decay velocity
      mouseVelocity.current.x *= 0.8;
      mouseVelocity.current.y *= 0.8;

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isMobile]);

  if (isMobile || location.pathname.startsWith('/admin')) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100000] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />


    </div>
  );
};

export default CustomCursor;
