'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
          ? 'glass-nav py-3 border-b border-white/10 shadow-2xl bg-void/80'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left Logo / Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavClick('hero')}>
          <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
            <span className="text-white font-sans tracking-wide">APPLE</span>
            <span className="text-white/40 text-sm font-normal">|</span>
            <span className="text-gradient-cyan text-base font-semibold">AirPods Max</span>
          </span>
        </div>

        {/* Center Nav Links - Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavClick(link.id)}
              className="text-xs font-medium uppercase tracking-wider text-white/70 hover:text-apple-cyan transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right CTA Button & Mobile Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => onNavClick('buy')}
            className="btn-gradient px-3 py-1.5 sm:px-4 rounded-full text-xs font-semibold tracking-wide text-white flex items-center space-x-1 shadow-lg shadow-apple-blue/20 hover:shadow-apple-cyan/30"
          >
            <span className="hidden xs:inline">Experience AirPods Max</span>
            <span className="xs:hidden">Experience</span>
            <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-white p-1 ml-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-nav border-t border-white/10 px-6 py-6 mt-3 space-y-4"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavClick(link.id);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-sm font-medium text-white/80 hover:text-apple-cyan py-2 border-b border-white/5"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onNavClick('buy');
              setMobileMenuOpen(false);
            }}
            className="w-full btn-gradient py-3 rounded-xl text-center text-sm font-semibold text-white flex items-center justify-center space-x-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Pre-Order Max ($549)</span>
          </button>
        </motion.div>
      )}
    </header>
  );
}
