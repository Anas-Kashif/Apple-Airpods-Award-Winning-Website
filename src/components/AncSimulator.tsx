'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Radio, Zap, Sliders, ShieldCheck } from 'lucide-react';

export default function AncSimulator() {
  const [ancMode, setAncMode] = useState<'off' | 'ambient' | 'full'>('full');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Audio wave canvas animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        const rect = container.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animId: number;
    let step = 0;

    const renderWave = () => {
      const container = canvas.parentElement;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      step += 0.05;

      const midY = height / 2;

      // Determine amplitude & frequency according to ANC mode
      let amplitude = 40;
      let opacity = 0.8;
      let waveColor = '#00D6FF';

      if (ancMode === 'off') {
        amplitude = Math.min(65, height * 0.4);
        opacity = 0.9;
        waveColor = '#FF3B30'; // Red noise
      } else if (ancMode === 'ambient') {
        amplitude = Math.min(30, height * 0.2);
        opacity = 0.7;
        waveColor = '#FFCC00'; // Amber ambient
      } else {
        amplitude = Math.min(4, height * 0.03);
        opacity = 0.4;
        waveColor = '#00D6FF'; // Pure cyan silence
      }

      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = waveColor;
      ctx.globalAlpha = opacity;

      for (let x = 0; x < width; x++) {
        const y = midY + Math.sin(x * 0.02 + step) * amplitude * Math.cos(x * 0.005);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw secondary complementary wave
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#0050FF';
      ctx.globalAlpha = opacity * 0.5;

      for (let x = 0; x < width; x++) {
        const y = midY + Math.cos(x * 0.03 - step * 1.5) * (amplitude * 0.7) * Math.sin(x * 0.008);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      animId = requestAnimationFrame(renderWave);
    };

    renderWave();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [ancMode]);

  return (
    <section id="anc-demo" className="relative py-12 xs:py-16 sm:py-28 px-3 xs:px-4 sm:px-6 lg:px-8 bg-charcoal-800 border-t border-b border-white/10 overflow-hidden">
      {/* Ambient background glow — responsive sizing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[200px] sm:w-[700px] sm:h-[350px] bg-apple-blue/10 blur-[80px] sm:blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 xs:mb-10 sm:mb-16">
          <div className="inline-flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-apple-blue/20 border border-apple-blue/40 text-apple-cyan text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
            <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse" />
            <span>Interactive Noise Cancellation</span>
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3 sm:mb-4">
            Silence on Demand. <span className="text-gradient-cyan">Tested in Real-Time.</span>
          </h2>
          <p className="text-xs xs:text-sm sm:text-lg text-white/70 max-w-2xl mx-auto">
            Select a sound environment below to experience how dual Apple H1 chips and an 8-microphone array neutralize ambient noise.
          </p>
        </div>

        {/* Visualizer Canvas Container */}
        <div className="glass-card rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-6 md:p-10 mb-6 xs:mb-8 sm:mb-10 border border-white/10 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <div className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl shrink-0 ${ancMode === 'full' ? 'bg-apple-cyan/20 text-apple-cyan' : ancMode === 'ambient' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>
                {ancMode === 'full' ? <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" /> : ancMode === 'ambient' ? <Radio className="w-5 h-5 sm:w-6 sm:h-6" /> : <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />}
              </div>
              <div>
                <h3 className="text-sm sm:text-lg font-bold text-white leading-tight">
                  {ancMode === 'full' ? '100% Active Noise Cancelling' : ancMode === 'ambient' ? 'Smart Transparency Mode' : 'Noise Cancellation OFF'}
                </h3>
                <p className="text-[10px] sm:text-xs text-white/50 leading-snug mt-0.5">
                  {ancMode === 'full' ? 'Computational Audio Active (-42dB Peak Reduction)' : ancMode === 'ambient' ? 'Microphones pass external sound naturally' : 'Unfiltered raw ambient noise environment'}
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-lg xs:text-xl sm:text-2xl font-mono font-bold text-gradient-cyan">
                {ancMode === 'full' ? '-42 dB' : ancMode === 'ambient' ? '-18 dB' : '0 dB'}
              </span>
              <span className="block text-[8px] xs:text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-white/40">NOISE ATTENUATION</span>
            </div>
          </div>

          {/* Waveform Canvas — properly responsive */}
          <div className="w-full h-20 xs:h-24 sm:h-36 bg-black/60 rounded-lg xs:rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden relative flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
            <div className="absolute bottom-1.5 sm:bottom-2 right-2 sm:right-4 text-[8px] xs:text-[9px] sm:text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-apple-cyan" />
              <span>Real-Time Signal</span>
            </div>
          </div>
        </div>

        {/* Mode Selectors — stack on small mobile, grid on xs+ */}
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4">
          <button
            onClick={() => setAncMode('off')}
            className={`p-3.5 xs:p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all text-left flex flex-row xs:flex-col items-center xs:items-start gap-3 xs:gap-0 justify-between min-h-0 ${
              ancMode === 'off'
                ? 'bg-red-500/10 border-red-500/50 shadow-lg shadow-red-500/10'
                : 'glass-card hover:border-white/20 active:border-white/30'
            }`}
          >
            <div className="flex items-center xs:justify-between xs:mb-3 xs:w-full">
              <Volume2 className={`w-5 h-5 ${ancMode === 'off' ? 'text-red-400' : 'text-white/40'}`} />
              <span className="text-xs font-mono text-white/40 ml-2 xs:ml-0">01</span>
            </div>
            <div className="text-right xs:text-left">
              <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5 xs:mb-1">ANC OFF</h4>
              <p className="text-[10px] xs:text-xs text-white/60 hidden xs:block">Hear full cabin pressure, engine roar & office noise.</p>
            </div>
          </button>

          <button
            onClick={() => setAncMode('ambient')}
            className={`p-3.5 xs:p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all text-left flex flex-row xs:flex-col items-center xs:items-start gap-3 xs:gap-0 justify-between min-h-0 ${
              ancMode === 'ambient'
                ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10'
                : 'glass-card hover:border-white/20 active:border-white/30'
            }`}
          >
            <div className="flex items-center xs:justify-between xs:mb-3 xs:w-full">
              <Radio className={`w-5 h-5 ${ancMode === 'ambient' ? 'text-amber-400' : 'text-white/40'}`} />
              <span className="text-xs font-mono text-white/40 ml-2 xs:ml-0">02</span>
            </div>
            <div className="text-right xs:text-left">
              <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5 xs:mb-1">Transparency</h4>
              <p className="text-[10px] xs:text-xs text-white/60 hidden xs:block">Passes announcements & conversation naturally.</p>
            </div>
          </button>

          <button
            onClick={() => setAncMode('full')}
            className={`p-3.5 xs:p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all text-left flex flex-row xs:flex-col items-center xs:items-start gap-3 xs:gap-0 justify-between min-h-0 ${
              ancMode === 'full'
                ? 'bg-apple-blue/20 border-apple-cyan shadow-xl shadow-apple-cyan/20'
                : 'glass-card hover:border-white/20 active:border-white/30'
            }`}
          >
            <div className="flex items-center xs:justify-between xs:mb-3 xs:w-full">
              <ShieldCheck className={`w-5 h-5 ${ancMode === 'full' ? 'text-apple-cyan' : 'text-white/40'}`} />
              <span className="text-[10px] xs:text-xs font-mono text-apple-cyan font-bold ml-2 xs:ml-0">03 (REC)</span>
            </div>
            <div className="text-right xs:text-left">
              <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5 xs:mb-1">100% ANC</h4>
              <p className="text-[10px] xs:text-xs text-white/60 hidden xs:block">Complete sensory isolation for pure focus.</p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
