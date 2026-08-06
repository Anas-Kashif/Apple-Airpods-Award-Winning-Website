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

      {/* Apple Corporate Copyright Footer */}
      <div className="border-t border-white/10 py-10 px-4 sm:px-6 lg:px-8 text-xs text-white/40 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-lg font-bold text-white font-sans tracking-wide">APPLE</span>
            <span>© 2026 Apple Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={() => onNavClick('hero')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavClick('hero')} className="hover:text-white transition-colors">
              Terms of Use
            </button>
            <button onClick={() => onNavClick('hero')} className="hover:text-white transition-colors">
              Support & Manuals
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
