import React, { useEffect } from 'react';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { Navigation } from '@/presentation/components/Navigation';
import HeroSection from '@/presentation/components/HeroSection';
import { TeachingsSection } from '@/presentation/components/TeachingsSection';
import { QuotesSection } from '@/presentation/components/QuotesSection';
import { useAppDispatch, useAppSelector } from '@/infrastructure/redux/hooks';
import { fetchSwamiJiInfo, fetchTeachings, fetchQuotes, fetchEvents } from '@/infrastructure/redux/slices/swamiJiSlice';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const { info, teachings, quotes, events, loading } = useAppSelector((state) => state.swamiJi);

  useEffect(() => {
    // Fetch data on component mount
    dispatch(fetchSwamiJiInfo());
    dispatch(fetchTeachings());
    dispatch(fetchQuotes());
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-primary-orange to-primary-gold">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="text-8xl text-white"
        >
          ॐ
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Swami Ji - Spiritual Master & Guide | Official Website</title>
        <meta name="description" content="Experience divine wisdom and spiritual enlightenment with Swami Ji. Explore sacred teachings, inspirational quotes, and upcoming spiritual events." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <Navigation />

        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection info={info} />

        {/* Teachings Section */}
        {teachings.length > 0 && <TeachingsSection teachings={teachings} />}

        {/* Quotes Section */}
        {quotes.length > 0 && <QuotesSection quotes={quotes} />}

        {/* Events Section */}
        {events.length > 0 && <EventsSection events={events} />}

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

// About Section Component
const AboutSection: React.FC<{ info: any }> = ({ info }) => {
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language as 'en' | 'hi';

  if (!info) return null;

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-orange to-primary-gold opacity-20" />
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full flex items-center justify-center text-9xl"
              >
                🕉️
              </motion.div>
            </div>
            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-primary-gold opacity-20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-primary-orange opacity-20"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="mb-4 text-4xl font-bold md:text-5xl gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t('about.title')}
            </motion.h2>

            <motion.p
              className="mb-6 text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {t('about.subtitle')}
            </motion.p>

            <motion.div
              className="mb-8 h-1 w-24 bg-gradient-to-r from-primary-orange to-primary-gold"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            />

            <motion.p
              className="mb-8 text-lg leading-relaxed text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {info.bio[currentLang]}
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              {t('common.learnMore')}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Events Section Component
const EventsSection: React.FC<{ events: any[] }> = ({ events }) => {
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language as 'en' | 'hi';

  return (
    <section id="events" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {t('events.title')}
          </h2>
          <p className="text-xl text-gray-600">{t('events.subtitle')}</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="p-8">
                <h3 className="mb-4 text-2xl font-bold text-gray-800">
                  {event.title[currentLang]}
                </h3>
                <p className="mb-6 text-gray-600 leading-relaxed">
                  {event.description[currentLang]}
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-primary-orange">
                    <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {new Date(event.date).toLocaleDateString(currentLang === 'hi' ? 'hi-IN' : 'en-US')}
                  </div>
                  <div className="flex items-center text-primary-orange">
                    <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {event.location[currentLang]}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary w-full"
                >
                  {t('events.register')}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-orange to-primary-gold text-2xl">
                ॐ
              </div>
              <span className="text-2xl font-bold">Swami Ji</span>
            </div>
            <p className="text-gray-400">
              {t('footer.copyright')}
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('footer.followUs')}</h3>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-primary-orange transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('footer.newsletter')}</h3>
            <div className="flex">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="flex-1 rounded-l-lg bg-white/10 px-4 py-2 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-orange"
              />
              <button className="rounded-r-lg bg-primary-orange px-6 py-2 font-semibold hover:bg-primary-light transition-colors">
                {t('footer.subscribe')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};
