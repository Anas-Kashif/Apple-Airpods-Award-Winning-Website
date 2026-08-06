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
      {/* Soft Ambient Radial Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-apple-blue/15 blur-[160px] rounded-full pointer-events-none" />

      {/* Pre-Order Banner Section */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold text-apple-cyan uppercase tracking-widest block mb-3 font-mono">
            HIGH-FIDELITY AUDIO RE-DEFINED
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Hear Everything. <span className="text-gradient-cyan">Feel Nothing Else.</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Order your Apple AirPods Max today. Includes complimentary priority shipping, 14-day trial, and AppleCare+ eligibility.
          </p>

          {/* Pricing & CTA Card */}
          <div className="glass-card max-w-xl mx-auto p-8 rounded-3xl border border-apple-cyan/30 shadow-2xl mb-12">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
              <div className="text-left">
                <span className="text-xs text-white/50 block font-mono uppercase">FLAGSHIP PRICE</span>
                <span className="text-4xl font-extrabold text-white">$549.00</span>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded-full bg-apple-cyan/10 border border-apple-cyan/40 text-apple-cyan text-xs font-semibold">
                  In Stock & Ready to Ship
                </span>
              </div>
            </div>

            <button
              onClick={() => alert('Thank you for ordering Apple AirPods Max!')}
              className="w-full btn-gradient py-4 rounded-2xl text-base font-bold tracking-wide text-white flex items-center justify-center space-x-2 shadow-2xl shadow-apple-blue/50 mb-6 hover:scale-[1.02] transition-transform"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Pre-Order AirPods Max Now</span>
            </button>

            {/* Trust Guarantee Badges */}
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-white/60 pt-2 font-medium">
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-apple-cyan mb-1" />
                <span>Free Express Delivery</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="w-4 h-4 text-apple-cyan mb-1" />
                <span>14-Day Free Returns</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-apple-cyan mb-1" />
                <span>AppleCare+ Eligible</span>
              </div>
            </div>
          </div>

          {/* What's In The Box Section */}
          <div className="glass-card max-w-3xl mx-auto p-8 rounded-3xl border border-white/10 text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-apple-cyan mb-4 font-mono">
              What's in the Box
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {boxIncludes.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-xs text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-apple-cyan shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Grand Google Labs Style Minimalist Footer - Matched to Dark Theme */}
      <div className="bg-void text-white border-t border-white/10 px-6 sm:px-12 lg:px-20 pt-16 pb-10 transition-colors">
        <div className="max-w-7xl mx-auto">
          {/* Top Navigation Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-sm font-medium">
            <span className="text-white/60 font-normal tracking-tight text-base sm:text-lg">
              Other teams and product areas
            </span>

            <div className="flex flex-wrap items-center gap-x-8 sm:gap-x-12 gap-y-3 text-sm font-normal text-white/60">
              <a href="#hero" onClick={(e) => { e.preventDefault(); onNavClick('hero'); }} className="hover:text-white transition-colors">
                Apple Music
              </a>
              <a href="#hero" onClick={(e) => { e.preventDefault(); onNavClick('hero'); }} className="hover:text-white transition-colors">
                Apple Vision Pro
              </a>
              <a href="#hero" onClick={(e) => { e.preventDefault(); onNavClick('hero'); }} className="hover:text-white transition-colors">
                Spatial Audio
              </a>
              <a href="#hero" onClick={(e) => { e.preventDefault(); onNavClick('hero'); }} className="hover:text-white transition-colors">
                AppleCare+
              </a>
            </div>
          </div>

          {/* Huge Hero Display Wordmark */}
          <div className="py-12 sm:py-16 md:py-20 select-none overflow-hidden">
            <h1 className="text-[13vw] sm:text-[14vw] lg:text-[13.5vw] font-bold tracking-[-0.04em] leading-[0.85] text-white whitespace-nowrap">
              AirPods Max
            </h1>
          </div>

          {/* Thin Hairline Divider */}
          <div className="border-t border-white/10 w-full mb-8" />

          {/* Bottom Bar Row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-xs font-normal">
            <div className="flex items-center space-x-3 text-base font-semibold tracking-tight text-white">
              <span>Apple</span>
              <span className="text-white/20">|</span>
              <span className="text-xs font-normal text-white/60">
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

            <div className="flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-3 font-mono tracking-[0.18em] text-[11px] uppercase text-white/50">
              <a href="#hero" onClick={(e) => { e.preventDefault(); onNavClick('hero'); }} className="hover:text-white transition-colors">
                ABOUT AIRPODS
              </a>
              <a href="#tech-specs" onClick={(e) => { e.preventDefault(); onNavClick('tech-specs'); }} className="hover:text-white transition-colors">
                APPLE PRODUCTS
              </a>
              <a href="#hero" onClick={(e) => { e.preventDefault(); onNavClick('hero'); }} className="hover:text-white transition-colors">
                PRIVACY
              </a>
              <a href="#hero" onClick={(e) => { e.preventDefault(); onNavClick('hero'); }} className="hover:text-white transition-colors">
                TERMS
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
