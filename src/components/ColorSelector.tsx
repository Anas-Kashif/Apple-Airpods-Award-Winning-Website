'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { COLOR_VARIANTS } from '@/lib/constants';
import { Check, Sparkles, Sliders } from 'lucide-react';

export default function ColorSelector() {
  const [selectedColor, setSelectedColor] = useState(COLOR_VARIANTS[0]);

  return (
    <section id="finishes" className="relative py-12 xs:py-16 sm:py-28 px-3 xs:px-4 sm:px-6 lg:px-8 bg-charcoal-800 border-t border-white/10">
      <div className="max-w-6xl mx-auto text-center">
        <span className="text-[10px] xs:text-xs font-semibold text-apple-cyan uppercase tracking-widest block mb-1.5 sm:mb-2 font-mono">
          PREMIUM FINISHES
        </span>
        <h2 className="text-xl xs:text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3 sm:mb-4">
          Crafted for <span className="text-gradient-cyan">Individual Elegance.</span>
        </h2>
        <p className="text-xs xs:text-sm sm:text-base text-white/60 max-w-xl mx-auto mb-6 xs:mb-8 sm:mb-12">
          Precision anodized aluminum ear cups and breathable mesh canopy engineered for luxury and acoustics.
        </p>

        {/* Color Swatches — properly spaced on mobile */}
        <div className="flex flex-wrap justify-center gap-4 xs:gap-5 sm:gap-6 mb-6 xs:mb-8 sm:mb-12">
          {COLOR_VARIANTS.map((variant) => {
            const isSelected = selectedColor.id === variant.id;
            return (
              <button
                key={variant.id}
                onClick={() => setSelectedColor(variant)}
                className="flex flex-col items-center group focus:outline-none min-h-0 min-w-0"
              >
                <div
                  className={`w-10 h-10 xs:w-11 xs:h-11 sm:w-14 sm:h-14 rounded-full p-0.5 xs:p-1 border-2 transition-all flex items-center justify-center ${
                    isSelected
                      ? 'border-apple-cyan scale-110 shadow-lg shadow-apple-cyan/30'
                      : 'border-white/20 group-hover:border-white/50 group-active:border-white/50'
                  }`}
                >
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center shadow-inner"
                    style={{ backgroundColor: variant.hex }}
                  >
                    {isSelected && <Check className={`w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 ${variant.id === 'silver' ? 'text-black' : 'text-white'}`} />}
                  </div>
                </div>
                <span className={`text-[10px] xs:text-[11px] sm:text-xs font-medium mt-1.5 xs:mt-2 sm:mt-3 transition-colors ${isSelected ? 'text-white font-bold' : 'text-white/50'}`}>
                  {variant.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Finish Info Showcase Card */}
        <motion.div
          key={selectedColor.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card max-w-2xl mx-auto p-4 xs:p-5 sm:p-8 rounded-xl xs:rounded-2xl sm:rounded-3xl border border-white/10 text-left relative overflow-hidden"
        >
          <div className="flex items-center space-x-2.5 sm:space-x-3 mb-2 sm:mb-3">
            <span
              className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 rounded-full border border-white/20 shrink-0"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white">{selectedColor.name} Edition</h3>
          </div>
          <p className="text-[11px] xs:text-xs sm:text-sm text-white/70 leading-relaxed mb-4 sm:mb-6">{selectedColor.desc}</p>

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-white/10 text-xs font-mono text-white/60">
            <div>
              <span className="block text-white/30 uppercase tracking-widest text-[9px] xs:text-[10px] sm:text-xs">COATING</span>
              <span className="text-white/90 font-semibold text-[11px] xs:text-xs sm:text-sm">Anti-Smudge Matte Texture</span>
            </div>
            <div>
              <span className="block text-white/30 uppercase tracking-widest text-[9px] xs:text-[10px] sm:text-xs">EAR PAD LEATHER</span>
              <span className="text-white/90 font-semibold text-[11px] xs:text-xs sm:text-sm">Matching Ultra-Soft Leather</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
