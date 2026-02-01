import { motion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
}

const TextReveal = ({ 
  text, 
  className = '', 
  delay = 0, 
  staggerChildren = 0.05 
}: TextRevealProps) => {
  const letters = text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ perspective: '1000px' }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ 
            transformStyle: 'preserve-3d',
            display: letter === ' ' ? 'inline' : 'inline-block',
            width: letter === ' ' ? '0.3em' : 'auto',
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default TextReveal;
