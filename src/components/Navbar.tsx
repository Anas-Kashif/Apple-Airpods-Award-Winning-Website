'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
}

export default function Navbar({ onNavClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Overview', id: 'hero' },
    { label: 'Technology', id: 'engineering' },
    { label: 'Noise Cancelling', id: 'anc-demo' },
    { label: 'Specs', id: 'specs' },
    { label: 'Finishes', id: 'finishes' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'glass-nav py-2 sm:py-3 border-b border-white/10 shadow-2xl bg-void/80'
          : 'bg-transparent py-3 sm:py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left Logo / Brand */}
        <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer shrink-0" onClick={() => onNavClick('hero')}>
          <span className="text-base sm:text-xl font-bold tracking-tight text-white flex items-center gap-1 sm:gap-1.5">
            <span className="text-white font-sans tracking-wide">APPLE</span>
            <span className="text-white/40 text-xs sm:text-sm font-normal">|</span>
            <span className="text-gradient-cyan text-sm sm:text-base font-semibold">AirPods Max</span>
          </span>
        </div>

        {/* Center Nav Links - Desktop */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavClick(link.id)}
              className="text-xs font-medium uppercase tracking-wider text-white/70 hover:text-apple-cyan transition-colors duration-200 min-h-0"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right CTA Button & Mobile Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={() => onNavClick('buy')}
            className="btn-gradient px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide text-white flex items-center space-x-1 shadow-lg shadow-apple-blue/20 hover:shadow-apple-cyan/30 min-h-0 whitespace-nowrap"
          >
            <span className="hidden xs:inline">Experience AirPods Max</span>
            <span className="xs:hidden">Buy Now</span>
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-0.5" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-white p-2 ml-0.5 min-h-0 min-w-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-x-0 top-[52px] sm:top-[60px] bottom-0 bg-void/95 backdrop-blur-xl border-t border-white/10 z-50 flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center px-8 py-6 space-y-1">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.3 }}
                  onClick={() => {
                    onNavClick(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-lg sm:text-xl font-semibold text-white/80 hover:text-apple-cyan active:text-apple-cyan py-4 border-b border-white/5 transition-colors min-h-0"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            <div className="px-8 pb-8 pt-4">
              <button
                onClick={() => {
                  onNavClick('buy');
                  setMobileMenuOpen(false);
                }}
                className="w-full btn-gradient py-4 rounded-2xl text-center text-sm font-bold text-white flex items-center justify-center space-x-2 shadow-2xl shadow-apple-blue/40 min-h-0"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Pre-Order Max ($549)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
