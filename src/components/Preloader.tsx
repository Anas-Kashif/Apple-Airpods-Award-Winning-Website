'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TOTAL_FRAMES } from '@/lib/constants';

interface PreloaderProps {
  onComplete: (images: HTMLImageElement[]) => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let count = 0;

    const padZero = (num: number) => num.toString().padStart(3, '0');

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = padZero(i);
      img.src = `/frames/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
        const percent = Math.floor((count / TOTAL_FRAMES) * 100);
        setProgress(percent);

        if (count === TOTAL_FRAMES) {
          setTimeout(() => {
            if (isMounted) {
              setIsFinished(true);
              setTimeout(() => onComplete(images), 600);
            }
          }, 300);
        }
      };

      img.onerror = () => {
        // Fallback on error to prevent infinite hangs
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setIsFinished(true);
          setTimeout(() => onComplete(images), 600);
        }
      };

      images[i - 1] = img;
    }

    return () => {
      isMounted = false;
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void text-white"
        >
          {/* Ambient Radial Glow */}
          <div className="absolute w-96 h-96 rounded-full bg-apple-blue/10 blur-[100px] pointer-events-none" />

          {/* Apple Minimal Brand Logo */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex items-center space-x-3"
            >
              <span className="text-2xl font-semibold tracking-widest text-white/90 uppercase">APPLE</span>
              <span className="text-xs px-2 py-0.5 rounded border border-white/20 text-white/60 tracking-wider">AIRPODS MAX</span>
            </motion.div>

            {/* Circular Progress Indicator */}
            <div className="relative flex items-center justify-center w-24 h-24 mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-white/10"
                  fill="transparent"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-apple-cyan transition-all duration-300 ease-out"
                  fill="transparent"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 - (251.2 * progress) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-sm font-medium tracking-tighter text-white/90">
                {progress}%
              </span>
            </div>

            {/* Subtext */}
            <p className="text-xs tracking-widest text-white/40 uppercase font-mono">
              Loading Acoustic Engineering ({loadedCount}/{TOTAL_FRAMES})
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
