'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPLODED_HOTSPOTS, Hotspot } from '@/lib/constants';
import { Cpu, Disc, Mic, Shield, X, Info } from 'lucide-react';

interface HotspotsProps {
  scrollProgress: number;
}

export default function Hotspots({ scrollProgress }: HotspotsProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  // Hotspots visible during 40% to 70% scroll progress (0.40 to 0.70)
  const isVisible = scrollProgress >= 0.40 && scrollProgress <= 0.70;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-apple-cyan" />;
      case 'Disc':
        return <Disc className="w-4 h-4 text-apple-cyan" />;
      case 'Mic':
        return <Mic className="w-4 h-4 text-apple-cyan" />;
      case 'Shield':
        return <Shield className="w-4 h-4 text-apple-cyan" />;
      default:
        return <Info className="w-4 h-4 text-apple-cyan" />;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-30 pointer-events-none"
        >
          {EXPLODED_HOTSPOTS.map((hotspot) => {
            const isSelected = selectedHotspot?.id === hotspot.id;

            return (
              <div
                key={hotspot.id}
                className="absolute pointer-events-auto"
                style={{
                  left: `${hotspot.xPercent}%`,
                  top: `${hotspot.yPercent}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Hotspot Badge Button */}
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.15 }}
                  onClick={() => setSelectedHotspot(isSelected ? null : hotspot)}
                  className={`relative flex items-center justify-center w-10 h-10 rounded-full glass-card border ${
                    isSelected
                      ? 'border-apple-cyan shadow-lg shadow-apple-cyan/40 bg-apple-blue/30'
                      : 'border-white/20 hover:border-apple-cyan'
                  } transition-all`}
                >
                  <span className="absolute inset-0 rounded-full bg-apple-cyan/20 animate-ping opacity-75" />
                  {getIcon(hotspot.iconName)}
                </motion.button>

                {/* Micro Card Popover */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className={`absolute bottom-full mb-3 w-[85vw] max-w-[280px] sm:w-72 glass-card p-4 sm:p-5 rounded-2xl border border-apple-cyan/40 shadow-2xl z-40 ${
                        hotspot.xPercent < 35
                          ? 'left-0'
                          : hotspot.xPercent > 65
                          ? 'right-0 left-auto'
                          : 'left-1/2 -translate-x-1/2'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getIcon(hotspot.iconName)}
                          <h4 className="text-sm font-bold text-white">{hotspot.title}</h4>
                        </div>
                        <button
                          onClick={() => setSelectedHotspot(null)}
                          className="text-white/40 hover:text-white p-1"
                          aria-label="Close details"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs font-semibold text-apple-cyan mb-1.5">{hotspot.subtitle}</p>
                      <p className="text-xs text-white/70 leading-relaxed">{hotspot.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
