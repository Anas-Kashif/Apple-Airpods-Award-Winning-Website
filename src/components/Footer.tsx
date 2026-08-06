'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ShieldCheck, Truck, RotateCcw, CheckCircle2, ChevronRight } from 'lucide-react';

interface FooterProps {
  onNavClick: (sectionId: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const boxIncludes = [
    'Apple AirPods Max Headphones',
    'Smart Case for Ultra-Low-Power Preservation',
    'Lightning to USB-C Cable',
    'Official Documentation & Quick Start Guide',
  ];

  return (
    <footer id="buy" className="relative bg-void border-t border-white/10 text-white overflow-hidden">
      {/* Soft Ambient Radial Background Glow — responsive */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] sm:w-[900px] sm:h-[400px] bg-apple-blue/15 blur-[100px] sm:blur-[160px] rounded-full pointer-events-none" />

      {/* Pre-Order Banner Section */}
      <div className="py-12 xs:py-16 sm:py-24 px-3 xs:px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] xs:text-xs font-semibold text-apple-cyan uppercase tracking-widest block mb-2 sm:mb-3 font-mono">
            HIGH-FIDELITY AUDIO RE-DEFINED
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 sm:mb-6">
            Hear Everything. <span className="text-gradient-cyan">Feel Nothing Else.</span>
          </h2>
          <p className="text-xs xs:text-sm sm:text-lg text-white/70 max-w-2xl mx-auto mb-6 xs:mb-8 sm:mb-10">
            Order your Apple AirPods Max today. Includes complimentary priority shipping, 14-day trial, and AppleCare+ eligibility.
          </p>

          {/* Pricing & CTA Card */}
          <div className="glass-card max-w-xl mx-auto p-4 xs:p-5 sm:p-8 rounded-xl xs:rounded-2xl sm:rounded-3xl border border-apple-cyan/30 shadow-2xl mb-6 xs:mb-8 sm:mb-12">
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xs:gap-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-white/10">
              <div className="text-left">
                <span className="text-[10px] xs:text-xs text-white/50 block font-mono uppercase">FLAGSHIP PRICE</span>
                <span className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-white">$549.00</span>
              </div>
              <div className="text-left xs:text-right">
                <span className="inline-block px-2.5 xs:px-3 py-0.5 xs:py-1 rounded-full bg-apple-cyan/10 border border-apple-cyan/40 text-apple-cyan text-[10px] xs:text-[11px] sm:text-xs font-semibold">
                  In Stock & Ready to Ship
                </span>
              </div>
            </div>

            <button
              onClick={() => alert('Thank you for ordering Apple AirPods Max!')}
              className="w-full btn-gradient py-3 xs:py-3.5 sm:py-4 rounded-xl xs:rounded-2xl text-xs xs:text-sm sm:text-base font-bold tracking-wide text-white flex items-center justify-center space-x-2 shadow-2xl shadow-apple-blue/50 mb-4 sm:mb-6 hover:scale-[1.02] active:scale-[0.98] transition-transform min-h-0"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Pre-Order AirPods Max Now</span>
            </button>

            {/* Trust Guarantee Badges */}
            <div className="grid grid-cols-3 gap-2 xs:gap-3 text-center text-[9px] xs:text-[10px] sm:text-[11px] text-white/60 pt-2 font-medium">
              <div className="flex flex-col items-center">
                <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-apple-cyan mb-1" />
                <span>Free Express</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-apple-cyan mb-1" />
                <span>14-Day Returns</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-apple-cyan mb-1" />
                <span>AppleCare+</span>
              </div>
            </div>
          </div>

          {/* What's In The Box Section */}
          <div className="glass-card max-w-3xl mx-auto p-4 xs:p-5 sm:p-8 rounded-xl xs:rounded-2xl sm:rounded-3xl border border-white/10 text-left">
            <h4 className="text-[10px] xs:text-xs sm:text-sm font-bold uppercase tracking-wider text-apple-cyan mb-3 sm:mb-4 font-mono">
              What's in the Box
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {boxIncludes.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2.5 sm:space-x-3 text-[11px] xs:text-xs text-white/80">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-apple-cyan shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Grand Google Labs Style Minimalist Footer */}
      <div className="bg-void text-white border-t border-white/10 px-3 xs:px-4 sm:px-12 lg:px-20 pt-8 xs:pt-10 sm:pt-16 pb-8 sm:pb-10 transition-colors">
        <div className="max-w-7xl mx-auto">
          {/* Top Navigation Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-6 text-sm font-medium">
            <span className="text-white/60 font-normal tracking-tight text-sm sm:text-lg">
              Other teams and product areas
            </span>

            <div className="flex flex-wrap items-center gap-x-4 xs:gap-x-6 sm:gap-x-12 gap-y-2 text-[11px] xs:text-xs sm:text-sm font-normal text-white/60">
              <a href="#hero" onClick={(e) => { e.preventDefault(); onNavClick('hero'); }} className="hover:text-white active:text-white transition-colors">
                Apple Music
              </a>
              <a href="#hero" onClick={(e) => { e.preventDefault(); onNavClick('hero'); }} className="hover:text-white active:text-white transition-colors">
                Apple Vision Pro
              </a>
              <a href="#hero" onClick={(e) => { e.preventDefault(); onNavClick('hero'); }} className="hover:text-white active:text-white transition-colors">
                Spatial Audio
              </a>
              <a href="#hero" onClick={(e) => { e.preventDefault(); onNavClick('hero'); }} className="hover:text-white active:text-white transition-colors">
                AppleCare+
              </a>
            </div>
          </div>

          {/* Huge Hero Display Wordmark — clamped for mobile */}
          <div className="py-6 xs:py-8 sm:py-16 md:py-20 select-none overflow-hidden text-center">
            <h1 className="text-[12vw] xs:text-[12vw] sm:text-[11vw] md:text-[13.5vw] font-bold tracking-tighter leading-[0.85] text-white inline-block max-w-full">
              AirPods Max
            </h1>
          </div>

          {/* Thin Hairline Divider */}
          <div className="border-t border-white/10 w-full mb-6 sm:mb-8" />

          {/* Bottom Bar Row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 text-xs font-normal">
            <div className="flex items-center space-x-2 sm:space-x-3 text-sm sm:text-base font-semibold tracking-tight text-white">
              <span>Apple</span>
              <span className="text-white/20">|</span>
              <span className="text-[10px] xs:text-xs font-normal text-white/60">
                Developed by{' '}
                <a
                  href="https://devbyanas.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-apple-cyan hover:underline transition-colors font-medium"
                >
                  Anas Kashif
                </a>
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-4 xs:gap-x-6 sm:gap-x-12 gap-y-2 font-mono tracking-[0.14em] xs:tracking-[0.18em] text-[9px] xs:text-[10px] sm:text-[11px] uppercase text-white/50">
              <a href="#hero" onClick={(e) => { e.preventDefault(); onNavClick('hero'); }} className="hover:text-white active:text-white transition-colors">
                ABOUT AIRPODS
              </a>
              <a href="#tech-specs" onClick={(e) => { e.preventDefault(); onNavClick('specs'); }} className="hover:text-white active:text-white transition-colors">
                APPLE PRODUCTS
              </a>
              <a href="#hero" onClick={(e) => { e.preventDefault(); onNavClick('hero'); }} className="hover:text-white active:text-white transition-colors">
                PRIVACY
              </a>
              <a href="#hero" onClick={(e) => { e.preventDefault(); onNavClick('hero'); }} className="hover:text-white active:text-white transition-colors">
                TERMS
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
