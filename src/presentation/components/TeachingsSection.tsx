import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { AnimatedText, GradientText } from './AnimatedText';
import { Teaching } from '@/domain/entities/SwamiJi';

interface TeachingsSectionProps {
  teachings: Teaching[];
}

// Spiritual SVG images for teachings
const teachingImages = [
  '/images/teachings/meditation.svg',
  '/images/teachings/lotus.svg',
  '/images/teachings/mandala.svg',
  '/images/teachings/enlightenment.svg',
  '/images/teachings/chakra.svg',
  '/images/teachings/peace.svg',
];

export const TeachingsSection: React.FC<TeachingsSectionProps> = ({ teachings }) => {
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language as 'en' | 'hi';
  const [selectedTeaching, setSelectedTeaching] = useState<Teaching | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isClosing, setIsClosing] = useState(false);

  const openModal = (teaching: Teaching, image: string) => {
    setIsClosing(false);
    setSelectedTeaching(teaching);
    setSelectedImage(image);
    // Add a class to prevent body scroll
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsClosing(true);
    // Use setTimeout to match exit animation duration
    setTimeout(() => {
      setSelectedTeaching(null);
      setSelectedImage('');
      document.body.style.overflow = '';
    }, 200);
  };

  return (
    <section id="teachings" className="relative py-20 bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #ff4d00 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 text-6xl"
          >
            🕉️
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <GradientText text={t('teachings.title')} />
          </h2>
          
          <AnimatedText
            text={t('teachings.subtitle')}
            className="text-xl text-gray-600"
            variant="slideUp"
            delay={0.3}
          />
        </motion.div>

        {/* Teachings Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teachings.map((teaching, index) => (
            <TeachingCard 
              key={teaching.id} 
              teaching={teaching} 
              index={index} 
              currentLang={currentLang}
              image={teachingImages[index % teachingImages.length]}
              onOpen={openModal}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <TeachingModal
        teaching={selectedTeaching}
        image={selectedImage}
        currentLang={currentLang}
        onClose={closeModal}
      />
    </section>
  );
};

interface TeachingCardProps {
  teaching: Teaching;
  index: number;
  currentLang: 'en' | 'hi';
  image: string;
  onOpen: (teaching: Teaching, image: string) => void;
}


// Teaching Modal Component
interface TeachingModalProps {
  teaching: Teaching | null;
  image: string;
  currentLang: 'en' | 'hi';
  onClose: () => void;
}

const TeachingModal: React.FC<TeachingModalProps> = ({ teaching, image, currentLang, onClose }) => {
  const { t } = useTranslation('common');

  if (!teaching) return null;

  return (
    <AnimatePresence mode="wait">
      {teaching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          style={{ willChange: 'opacity' }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
            style={{ 
              willChange: 'transform, opacity',
              transform: 'translateZ(0)'
            }}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-primary-orange hover:text-white transition-colors"
              style={{ willChange: 'transform' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Image - Using transform-based animation */}
            <motion.div 
              className="relative overflow-hidden w-[300px] h-[200px] rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none"
              style={{ float: 'left', margin: '0 1.5rem 1rem 0' }}
            >
              <motion.div
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="w-full h-full"
                style={{ willChange: 'transform, opacity' }}
              >
                <motion.img
                src={image}
                alt={teaching.title[currentLang]}
                className="w-full h-full object-cover"
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                style={{ willChange: 'transform, opacity' }}
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="absolute inset-0 bg-gradient-to-br from-primary-orange/20 to-transparent" />
            </motion.div>
            </motion.div>

            {/* Content */}
            <div className="p-8">
              {/* Category Badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="inline-block mb-4 rounded-full bg-primary-orange/10 px-4 py-1 text-sm font-semibold text-primary-orange"
              >
                {t(`teachings.categories.${teaching.category}`)}
              </motion.div>

              {/* Title - Letter by letter animation */}
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6 text-gray-800"
              >
                {teaching.title[currentLang].split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.9 + i * 0.03,
                      type: 'spring',
                      damping: 12
                    }}
                    className="inline-block"
                    style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.h2>

              {/* Decorative divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="h-1 w-24 bg-gradient-to-r from-primary-orange to-primary-gold mb-6 rounded-full"
              />

              {/* Content - Word by word animation */}
              <motion.div className="text-lg text-gray-700 leading-relaxed mb-6">
                {teaching.content[currentLang].split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 1.3 + i * 0.05,
                      type: 'spring',
                      damping: 15
                    }}
                    className="inline-block mr-1"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="flex items-center justify-between pt-6 border-t border-gray-200"
              >
                <div className="flex items-center text-gray-500">
                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">
                    {new Date(teaching.date).toLocaleDateString(currentLang === 'hi' ? 'hi-IN' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                {/* Share Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-orange to-primary-light text-white rounded-full hover:shadow-lg transition-shadow"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  <span className="text-sm font-semibold">{t('common.share')}</span>
                </motion.button>
              </motion.div>

              {/* Decorative Om Symbol */}
              <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 0.1 }}
                transition={{ delay: 2.2, duration: 0.8 }}
                className="absolute bottom-8 right-8 text-9xl text-primary-orange pointer-events-none"
              >
                ॐ
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TeachingCard: React.FC<TeachingCardProps> = ({ teaching, index, currentLang, image, onOpen }) => {
  const { t } = useTranslation('common');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.div
        ref={cardRef}
        style={{ y }}
        whileHover={{ scale: 1.05, y: -10 }}
        onClick={() => onOpen(teaching, image)}
        className="group relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg transition-all hover:shadow-2xl cursor-pointer"
      >
        {/* Image with animation */}
        <motion.div 
          className="relative h-48 overflow-hidden"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.img
            src={image}
            alt={teaching.title[currentLang]}
            className="w-full h-full object-cover"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Floating particles on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ opacity: 0 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary-gold rounded-full"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${30 + i * 20}%`,
                }}
                animate={{
                  y: [-20, -40, -20],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="p-6">
          {/* Decorative Corner */}
          <motion.div
            className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-primary-orange to-primary-gold opacity-10"
            whileHover={{ scale: 1.5, opacity: 0.2 }}
            transition={{ duration: 0.3 }}
          />

          {/* Category Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="mb-4 inline-block rounded-full bg-primary-orange/10 px-4 py-1 text-sm font-semibold text-primary-orange"
          >
            {t(`teachings.categories.${teaching.category}`)}
          </motion.div>

          {/* Title with micro animation */}
          <motion.h3
            className="mb-4 text-2xl font-bold text-gray-800"
            whileHover={{ x: 5 }}
          >
            {teaching.title[currentLang].split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.4 + i * 0.05 }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </motion.h3>

          {/* Content preview */}
          <motion.p
            className="mb-6 text-gray-600 leading-relaxed line-clamp-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            {teaching.content[currentLang]}
          </motion.p>

          {/* Date */}
          <motion.div
            className="flex items-center text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.6 }}
          >
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {new Date(teaching.date).toLocaleDateString(currentLang === 'hi' ? 'hi-IN' : 'en-US')}
          </motion.div>

          {/* Hover Effect Border */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary-orange to-primary-gold"
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />

          {/* Read More Hint */}
          <motion.div
            className="mt-4 flex items-center text-primary-orange font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ x: 5 }}
          >
            <span className="text-sm">{t('common.readMore')}</span>
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
