import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/infrastructure/redux/hooks';
import { toggleMobileMenu, closeMobileMenu, setIsScrolled } from '@/infrastructure/redux/slices/uiSlice';

export const Navigation: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  const dispatch = useAppDispatch();
  const { isMobileMenuOpen, isScrolled } = useAppSelector((state) => state.ui);
  const currentLanguage = useAppSelector((state) => state.language.current);

  useEffect(() => {
    const handleScroll = () => {
      dispatch(setIsScrolled(window.scrollY > 50));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  const navItems: Array<{ key: string; href: string; label?: string }> = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'teachings', href: '#teachings' },
    { key: 'quotes', href: '#quotes' },
    { key: 'events', href: '#events' },
    { key: 'contact', href: '#contact' },
    // Test API route (external JSON placeholder demo)
    { key: 'test-api', href: '/test-api', label: 'Test API' },
  ];

  const router = useRouter();

  const handleNavClick = (e: React.MouseEvent, item: { key: string; href: string; label?: string }) => {
    // Close mobile menu for any click
    dispatch(closeMobileMenu());

    const href = item.href || '';

    // If it's a hash link (in-page anchor) and we are not on the home page,
    // navigate to the root with hash so the page will scroll to the section.
    if (href.startsWith('#')) {
      e.preventDefault();
      const anchor = href.replace('#', '');
      // If we're already on the home page, smooth-scroll to the element
      if (router.pathname === '/' || router.pathname === '/index') {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // fallback: update url so browser can try to jump
          router.push(`/#${anchor}`);
        }
        return;
      }

      // otherwise navigate to root with hash
      router.push(`/#${anchor}`);
      return;
    }

    // If it's an absolute path to the current page with a hash (e.g. /#home)
    // allow router.push for client navigation
    if (href.startsWith('/')) {
      // Default behavior handled by anchor, but use router to avoid full reload
      e.preventDefault();
      router.push(href);
      return;
    }

    // Otherwise, let the anchor act normally
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg'
          : 'bg-gradient-to-b from-black/50 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-orange to-primary-gold text-2xl text-white shadow-lg">
              ॐ
            </div>
            <span
              className={`text-xl font-bold ${
                isScrolled ? 'text-primary-orange' : 'text-white'
              }`}
            >
              Swami Ji
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navItems.map((item) => (
              <motion.a
                key={item.key}
                href={item.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleNavClick(e, item)}
                className={`relative text-sm font-medium transition-colors ${
                  isScrolled
                    ? 'text-gray-700 hover:text-primary-orange'
                    : 'text-white hover:text-primary-gold'
                }`}
              >
                {item.label ?? t(`nav.${item.key}`)}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary-gold"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}

            {/* Language Switcher */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleLanguage}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                isScrolled
                  ? 'bg-primary-orange text-white hover:bg-primary-light'
                  : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
              }`}
            >
              {currentLanguage === 'en' ? 'हिं' : 'EN'}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => dispatch(toggleMobileMenu())}
            className={`md:hidden ${
              isScrolled ? 'text-primary-orange' : 'text-white'
            }`}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white shadow-lg md:hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={(e) => handleNavClick(e, item)}
                  className="block py-2 text-lg font-medium text-gray-700 hover:text-primary-orange"
                >
                  {item.label ?? t(`nav.${item.key}`)}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                onClick={toggleLanguage}
                className="w-full rounded-lg bg-primary-orange py-3 text-white font-semibold hover:bg-primary-light"
              >
                {currentLanguage === 'en' ? 'Switch to Hindi (हिं)' : 'Switch to English (EN)'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
