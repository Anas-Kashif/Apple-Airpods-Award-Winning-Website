'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STORY_BEATS, StoryBeat } from '@/lib/constants';
import { ChevronRight, ArrowDown, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface StoryBeatsProps {
  scrollProgress: number; // 0 to 1
  onCtaClick: (target: string) => void;
}

export default function StoryBeats({ scrollProgress, onCtaClick }: StoryBeatsProps) {
  // Determine active beat based on scroll progress
  const activeBeat = STORY_BEATS.find(
    (beat) => scrollProgress >= beat.startProgress && scrollProgress <= beat.endProgress
  );

  return (
    <div className="fixed inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-12">
      {/* Top Margin Spacer */}
      <div className="h-16" />

      {/* Main Narrative Beats Overlay Container */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          {activeBeat && (
            <motion.div
              key={activeBeat.id}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full max-w-2xl pointer-events-auto ${
                activeBeat.alignment === 'center'
                  ? 'text-center mx-auto'
                  : activeBeat.alignment === 'left'
                  ? 'text-left mr-auto md:ml-6'
                  : 'text-right ml-auto md:mr-6'
              }`}
            >
              {/* Eyebrow Label */}
              {activeBeat.eyebrow && (
                <div
                  className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md ${
                    activeBeat.alignment === 'center' ? 'mx-auto' : ''
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-apple-cyan" />
                  <span className="text-[11px] font-semibold tracking-widest text-apple-cyan uppercase">
                    {activeBeat.eyebrow}
                  </span>
                </div>
              )}

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-[1.08]">
                {activeBeat.title.includes('AirPods Max') ? (
                  <>
                    <span className="block text-white">Apple</span>
                    <span className="text-gradient-cyan">AirPods Max</span>
                  </>
                ) : (
                  activeBeat.title
                )}
              </h1>

              {/* Subtitle / Body Copy */}
              <p className="text-lg sm:text-xl text-white/70 font-normal leading-relaxed mb-6 max-w-xl">
                {activeBeat.subtitle}
              </p>

              {/* Key Feature Bullet Points */}
              {activeBeat.points && (
                <div
                  className={`flex flex-col space-y-2.5 mb-8 ${
                    activeBeat.alignment === 'center'
                      ? 'items-center'
                      : activeBeat.alignment === 'left'
                      ? 'items-start'
                      : 'items-end'
                  }`}
                >
                  {activeBeat.points.map((pt, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2.5 text-sm text-white/80 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-apple-cyan shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Hero Scroll Indicator */}
              {activeBeat.id === 'hero' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 flex flex-col items-center justify-center space-y-2 text-white/40"
                >
                  <span className="text-xs tracking-widest uppercase font-mono">Scroll to Explode & Explore</span>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  >
                    <ArrowDown className="w-4 h-4 text-apple-cyan" />
                  </motion.div>
                </motion.div>
              )}

              {/* Call to Action Buttons (Final Beat) */}
              {activeBeat.ctaText && (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => onCtaClick('buy')}
                    className="btn-gradient px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide text-white flex items-center space-x-2 shadow-2xl shadow-apple-blue/50 hover:scale-105 transition-transform"
                  >
                    <span>{activeBeat.ctaText}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {activeBeat.secondaryCtaText && (
                    <button
                      onClick={() => onCtaClick('specs')}
                      className="px-6 py-3.5 rounded-full text-sm font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 backdrop-blur-md transition-all"
                    >
                      {activeBeat.secondaryCtaText}
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Progress Bar & Indicator */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-auto pt-4 border-t border-white/5 text-xs text-white/40">
        <div className="flex items-center space-x-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-apple-cyan animate-pulse" />
          <span className="uppercase tracking-widest">SCROLL PROGRESS</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-32 sm:w-48 h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-apple-blue to-apple-cyan transition-all duration-150"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
          <span className="font-mono text-white/70 min-w-[40px] text-right">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
