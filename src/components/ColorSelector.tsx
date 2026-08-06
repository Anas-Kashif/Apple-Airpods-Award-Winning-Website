'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { COLOR_VARIANTS } from '@/lib/constants';
import { Check, Sparkles, Sliders } from 'lucide-react';

export default function ColorSelector() {
  const [selectedColor, setSelectedColor] = useState(COLOR_VARIANTS[0]);

  return (
    <section id="finishes" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-charcoal-800 border-t border-white/10">
      <div className="max-w-6xl mx-auto text-center">
        <span className="text-xs font-semibold text-apple-cyan uppercase tracking-widest block mb-2 font-mono">
          PREMIUM FINISHES
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
          Crafted for <span className="text-gradient-cyan">Individual Elegance.</span>
        </h2>
        <p className="text-base text-white/60 max-w-xl mx-auto mb-12">
          Precision anodized aluminum ear cups and breathable mesh canopy engineered for luxury and acoustics.
        </p>

        {/* Color Swatches */}
        <div className="flex justify-center space-x-6 mb-12">
          {COLOR_VARIANTS.map((variant) => {
            const isSelected = selectedColor.id === variant.id;
            return (
              <button
                key={variant.id}
                onClick={() => setSelectedColor(variant)}
                className="flex flex-col items-center group focus:outline-none"
              >
                <div
                  className={`w-14 h-14 rounded-full p-1 border-2 transition-all flex items-center justify-center ${
                    isSelected
                      ? 'border-apple-cyan scale-110 shadow-lg shadow-apple-cyan/30'
                      : 'border-white/20 group-hover:border-white/50'
                  }`}
                >
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center shadow-inner"
                    style={{ backgroundColor: variant.hex }}
                  >
                    {isSelected && <Check className={`w-5 h-5 ${variant.id === 'silver' ? 'text-black' : 'text-white'}`} />}
                  </div>
                </div>
                <span className={`text-xs font-medium mt-3 transition-colors ${isSelected ? 'text-white font-bold' : 'text-white/50'}`}>
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
          className="glass-card max-w-2xl mx-auto p-8 rounded-3xl border border-white/10 text-left relative overflow-hidden"
        >
          <div className="flex items-center space-x-3 mb-3">
            <span
              className="w-4 h-4 rounded-full border border-white/20"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <h3 className="text-xl font-bold text-white">{selectedColor.name} Edition</h3>
          </div>
          <p className="text-sm text-white/70 leading-relaxed mb-6">{selectedColor.desc}</p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono text-white/60">
            <div>
              <span className="block text-white/30 uppercase tracking-widest">COATING</span>
              <span className="text-white/90 font-semibold">Anti-Smudge Matte Texture</span>
            </div>
            <div>
              <span className="block text-white/30 uppercase tracking-widest">EAR PAD LEATHER</span>
              <span className="text-white/90 font-semibold">Matching Ultra-Soft Leather</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
