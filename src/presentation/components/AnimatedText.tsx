import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  variant?: 'fadeIn' | 'slideUp' | 'scale' | 'wave';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.03,
  variant = 'fadeIn',
}) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    }),
  };

  const getChildVariants = () => {
    switch (variant) {
      case 'fadeIn':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5 } },
        };
      case 'slideUp':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        };
      case 'wave':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: [20, -5, 0],
            transition: { duration: 0.5 },
          },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  const childVariants = getChildVariants();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={childVariants} className="inline-block mr-2">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Letter-by-letter animation component
interface AnimatedLettersProps {
  text: string;
  className?: string;
  delay?: number;
}

export const AnimatedLetters: React.FC<AnimatedLettersProps> = ({
  text,
  className = '',
  delay = 0,
}) => {
  const letters = text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ display: letter === ' ' ? 'inline' : 'inline-block' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Gradient Text with Animation
interface GradientTextProps {
  text: string;
  className?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({ text, className = '' }) => {
  return (
    <motion.span
      initial={{ backgroundPosition: '0% 50%' }}
      animate={{ backgroundPosition: '100% 50%' }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
      className={`bg-gradient-to-r from-primary-orange via-primary-gold to-primary-light bg-clip-text text-transparent bg-[length:200%_auto] ${className}`}
    >
      {text}
    </motion.span>
  );
};
