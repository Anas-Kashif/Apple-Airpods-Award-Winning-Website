'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STORY_BEATS } from '@/lib/constants';
import { ChevronRight, ArrowDown, Sparkles, CheckCircle2 } from 'lucide-react';

interface StoryBeatsProps {
  scrollProgress: number; // 0 to 1
  onCtaClick: (target: string) => void;
}

export default function StoryBeats({ scrollProgress, onCtaClick }: StoryBeatsProps) {
  // Determine active beat based on scroll progress
  const activeBeat = STORY_BEATS.find(
    (beat) => scrollProgress >= beat.startProgress && scrollProgress <= beat.endProgress
  );

  const isHero = activeBeat?.id === 'hero';

  return (
    <div className="fixed inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-12">
      {/* Top Margin Spacer for Fixed Navbar */}
      <div className="h-16" />

      {/* Main Narrative Beats Overlay Container */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex items-center relative">
        <AnimatePresence mode="wait">
          {activeBeat && isHero && (
            <motion.div
              key="hero-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Hero Copy & CTA */}
              <div className="lg:col-span-6 xl:col-span-5 text-left pointer-events-auto z-20 flex flex-col items-start justify-center">
                {/* Eyebrow Label */}
                {activeBeat.eyebrow && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-apple-cyan" />
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-apple-cyan uppercase">
                      {activeBeat.eyebrow}
                    </span>
                  </motion.div>
                )}

                {/* Large Bold Apple-style Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.04]"
                >
                  <span className="block text-white">Apple</span>
                  <span className="block text-gradient-cyan mt-1">AirPods Max</span>
                </motion.h1>

                {/* Description Paragraph (#D1D1D1, Max Width 500px) */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="text-base sm:text-lg text-[#D1D1D1] font-normal leading-relaxed mb-8 max-w-[500px]"
                >
                  {activeBeat.subtitle}
                </motion.p>

                {/* Premium CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center space-x-4"
                >
                  <button
                    onClick={() => onCtaClick('buy')}
                    className="btn-gradient px-8 py-4 rounded-full text-sm font-semibold tracking-wide text-white flex items-center space-x-3 shadow-2xl shadow-apple-blue/40 hover:scale-105 transition-all group"
                  >
                    <span>Experience AirPods Max</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </div>

              {/* Right Column: Reserved spacer for AirPods Max 3D Render */}
              <div className="hidden lg:block lg:col-span-6 xl:col-span-7 h-full min-h-[400px] pointer-events-none" />
            </motion.div>
          )}

          {activeBeat && !isHero && (
            <motion.div
              key={activeBeat.id}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full max-w-lg pointer-events-auto ${
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
                  className={`inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 mb-3 backdrop-blur-md ${
                    activeBeat.alignment === 'center' ? 'mx-auto' : ''
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-apple-cyan" />
                  <span className="text-[10px] font-semibold tracking-widest text-apple-cyan uppercase">
                    {activeBeat.eyebrow}
                  </span>
                </div>
              )}

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-3 leading-[1.1] whitespace-pre-line">
                {activeBeat.title}
              </h2>

              {/* Subtitle / Body Copy (#D1D1D1) */}
              <p className="text-sm sm:text-base text-[#D1D1D1] font-normal leading-relaxed mb-4 max-w-md">
                {activeBeat.subtitle}
              </p>

              {/* Key Feature Bullet Points */}
              {activeBeat.points && (
                <div
                  className={`flex flex-col space-y-2 mb-6 ${
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
                      className="flex items-center space-x-2 text-xs sm:text-sm text-[#D1D1D1] font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-apple-cyan shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Call to Action Buttons */}
              {activeBeat.ctaText && (
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => onCtaClick('buy')}
                    className="btn-gradient px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white flex items-center space-x-2 shadow-xl shadow-apple-blue/40 hover:scale-105 transition-transform"
                  >
                    <span>{activeBeat.ctaText}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {activeBeat.secondaryCtaText && (
                    <button
                      onClick={() => onCtaClick('specs')}
                      className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 backdrop-blur-md transition-all"
                    >
                      {activeBeat.secondaryCtaText}
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Center Scroll Indicator (Hero Only) */}
        {scrollProgress <= 0.15 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center justify-center space-y-2 pointer-events-auto cursor-pointer group"
            onClick={() => onCtaClick('engineering')}
          >
            <span className="text-[11px] tracking-[0.22em] uppercase font-mono text-white/50 group-hover:text-white/90 transition-colors">
              Scroll to Explore
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-4 h-4 text-apple-cyan group-hover:text-white transition-colors" />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Bottom Scroll Progress Bar */}
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
