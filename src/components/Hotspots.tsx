'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPLODED_HOTSPOTS, Hotspot } from '@/lib/constants';
import { Cpu, Disc, Mic, Shield, X, Info } from 'lucide-react';

interface HotspotsProps {
  scrollProgress: number;
}

export default function Hotspots({ scrollProgress }: HotspotsProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hotspots visible during 40% to 70% scroll progress (0.40 to 0.70)
  const isVisible = scrollProgress >= 0.40 && scrollProgress <= 0.70;

  const getIcon = (iconName: string, size?: string) => {
    const className = size || 'w-3.5 h-3.5 sm:w-4 sm:h-4 text-apple-cyan';
    switch (iconName) {
      case 'Cpu':
        return <Cpu className={className} />;
      case 'Disc':
        return <Disc className={className} />;
      case 'Mic':
        return <Mic className={className} />;
      case 'Shield':
        return <Shield className={className} />;
      default:
        return <Info className={className} />;
    }
  };

  // On mobile, show hotspots as a bottom sheet list instead of positioned dots
  if (isMobile) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 z-30 pointer-events-auto"
          >
            {/* Gradient fade from transparent to card background */}
            <div className="bg-gradient-to-t from-void via-void/90 to-transparent pt-10 pb-4 px-3">
              {/* Compact horizontal scrollable chips */}
              <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
                {EXPLODED_HOTSPOTS.map((hotspot) => {
                  const isSelected = selectedHotspot?.id === hotspot.id;
                  return (
                    <motion.button
                      key={hotspot.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={() => setSelectedHotspot(isSelected ? null : hotspot)}
                      className={`flex-none snap-start flex items-center space-x-2 px-3 py-2.5 rounded-xl border transition-all min-h-0 ${
                        isSelected
                          ? 'bg-apple-blue/20 border-apple-cyan/60 shadow-lg shadow-apple-cyan/20'
                          : 'glass-card border-white/10 active:border-apple-cyan/40'
                      }`}
                    >
                      {getIcon(hotspot.iconName, 'w-3.5 h-3.5 text-apple-cyan shrink-0')}
                      <span className="text-[11px] font-semibold text-white whitespace-nowrap">
                        {hotspot.title}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Expanded detail card */}
              <AnimatePresence>
                {selectedHotspot && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden mt-2"
                  >
                    <div className="glass-card p-4 rounded-2xl border border-apple-cyan/30">
                      <div className="flex items-start justify-between mb-1.5">
                        <div className="flex items-center space-x-2">
                          {getIcon(selectedHotspot.iconName)}
                          <h4 className="text-sm font-bold text-white">{selectedHotspot.title}</h4>
                        </div>
                        <button
                          onClick={() => setSelectedHotspot(null)}
                          className="text-white/40 hover:text-white p-1 min-h-0 min-w-0"
                          aria-label="Close details"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] font-semibold text-apple-cyan mb-1">
                        {selectedHotspot.subtitle}
                      </p>
                      <p className="text-[11px] text-white/70 leading-relaxed">
                        {selectedHotspot.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Desktop: positioned hotspot dots on canvas
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
                  className={`relative flex items-center justify-center w-10 h-10 rounded-full glass-card border min-h-0 ${
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
                      className={`absolute bottom-full mb-3 w-72 glass-card p-5 rounded-2xl border border-apple-cyan/40 shadow-2xl z-40 ${
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
                          className="text-white/40 hover:text-white p-1 min-h-0 min-w-0"
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
