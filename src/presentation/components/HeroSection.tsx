import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import styles from '@/presentation/styles/HeroSection.module.css';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '@/presentation/components/ErrorBoundary';

interface HeroSlide {
  title: string;
  subtitle: string;
  image: string;
  description: string;
}

interface HeroSectionProps {
  backgroundImage?: string;
}

const HeroSectionContent: React.FC<HeroSectionProps> = ({ backgroundImage }) => {
  const { t } = useTranslation('common');
  const ref = useRef<HTMLDivElement>(null);
  
  // Component state
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [contentVisible, setContentVisible] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(4);
  const [error, setError] = useState<Error | null>(null);

  // Create slides data with error handling
  const slides = React.useMemo(() => 
    Array.from({ length: 6 }, (_, i) => {
      try {
        return {
          title: t(`hero.slides.${i}.title`),
          subtitle: t(`hero.slides.${i}.subtitle`),
          image: t(`hero.slides.${i}.image`),
          description: t(`hero.slides.${i}.description`)
        };
      } catch (err) {
        console.error(`Error loading slide ${i}:`, err);
        return null;
      }
    }).filter(Boolean) as HeroSlide[]
  , [t]);

  // Effects with error handling
  useEffect(() => {
    try {
      setIsMounted(true);
    } catch (err) {
      setError(err as Error);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    try {
      setImageLoaded(false);
      setContentVisible(false);
    } catch (err) {
      setError(err as Error);
    }
  }, [currentSlide, isMounted]);

  useEffect(() => {
    if (!isMounted || !imageLoaded) return;

    const timer = setTimeout(() => {
      try {
        setContentVisible(true);
      } catch (err) {
        setError(err as Error);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [imageLoaded, isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    const slideTimer = setInterval(() => {
      try {
        setCurrentSlide(prev => (prev + 1) % slides.length);
        setTimeLeft(4);
      } catch (err) {
        setError(err as Error);
      }
    }, 4000);

    const countdownTimer = setInterval(() => {
      try {
        setTimeLeft(prev => prev > 0 ? prev - 1 : 4);
      } catch (err) {
        setError(err as Error);
      }
    }, 1000);

    return () => {
      clearInterval(slideTimer);
      clearInterval(countdownTimer);
    };
  }, [isMounted, slides.length]);

  // Animation setup
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  // Handlers with error handling
  const handleImageLoad = () => {
    try {
      if (isMounted) {
        setImageLoaded(true);
      }
    } catch (err) {
      setError(err as Error);
    }
  };

  if (error) {
    throw error; // This will be caught by ErrorBoundary
  }

  if (!slides.length) {
    throw new Error('No slides data available');
  }

  return (
    <div
      ref={ref}
      className="relative h-screen overflow-hidden bg-gradient-to-b from-primary-orange via-primary-light to-primary-gold"
    >
      {/* Rest of the component content */}
      {/* (keeping all the existing JSX structure) */}
      <motion.div
        style={{ y: springY, scale }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : 'linear-gradient(135deg, #ff4d00 0%, #ff7400 50%, #ffc100 100%)',
          }}
        />
        <div className="absolute inset-0 bg-black opacity-40" />
      </motion.div>

      {/* Floating OM Symbol */}
      <motion.div
        className="absolute top-20 right-20 text-white text-9xl opacity-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        ॐ
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
      >
        {/* Background Image with Loading Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`image-${currentSlide}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-0"
          >
            {isMounted && slides[currentSlide] && (
              <>
                <motion.img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  onLoad={handleImageLoad}
                  className={`w-full h-full object-cover opacity-30 ${styles['slide-image']} ${
                    imageLoaded ? styles['image-loaded'] : styles['image-loading']
                  }`}
                  style={{ willChange: 'transform' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Animated Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 30 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`relative z-10 ${styles['slide-content']}`}
          >
            {isMounted && slides[currentSlide] && (
              <>
                {/* Sacred Symbol */}
                <div className="text-6xl mb-6 text-white opacity-80">
                  ॐ
                </div>

                {/* Title */}
                <motion.h1
                  className="mb-6 text-5xl font-bold text-white md:text-7xl lg:text-8xl"
                >
                  {slides[currentSlide].title.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 20 }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.03 }}
                      className="inline-block"
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mb-8 max-w-3xl text-xl text-white md:text-2xl lg:text-3xl"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: contentVisible ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mb-8 text-lg text-white/80"
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* Animated Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: contentVisible ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="mb-8 h-1 w-32 bg-gradient-to-r from-transparent via-white to-transparent"
                />

                {/* CTA Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: contentVisible ? 1 : 0, 
                    scale: contentVisible ? 1 : 0.8 
                  }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 193, 0, 0.8)' }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-white px-10 py-4 text-lg font-semibold text-primary-orange shadow-lg transition-all hover:bg-primary-gold hover:text-white"
                >
                  {t('hero.cta')}
                </motion.button>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        {isMounted && (
          <div className="absolute bottom-10 flex space-x-2">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                initial={{ opacity: 0.3 }}
                animate={{ 
                  opacity: currentSlide === index ? 1 : 0.3,
                  width: currentSlide === index ? '2rem' : '0.5rem'
                }}
                whileHover={{ opacity: 0.8 }}
                className="h-2 rounded-full bg-white transition-all"
                style={{ willChange: 'width, opacity' }}
              />
            ))}
          </div>
        )}

        {/* Next Slide Hint */}
        {isMounted && contentVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute right-8 top-1/2 -translate-y-1/2 text-white/50"
          >
            <motion.div className="flex flex-col items-center space-y-2">
              <motion.p className="vertical-text text-sm tracking-widest">
                NEXT SLIDE IN
              </motion.p>
              <motion.div
                key={timeLeft}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`text-2xl font-bold text-white/80 ${styles['timer-number']}`}
              >
                {timeLeft}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

const HeroSection: React.FC<HeroSectionProps> = ({ backgroundImage }) => {
  return (
    <ErrorBoundary>
      <HeroSectionContent backgroundImage={backgroundImage} />
    </ErrorBoundary>
  );
};

export default HeroSection;