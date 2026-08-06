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

    let animId: number;
    let step = 0;

    const renderWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      step += 0.05;

      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      // Determine amplitude & frequency according to ANC mode
      let amplitude = 40;
      let opacity = 0.8;
      let waveColor = '#00D6FF';

      if (ancMode === 'off') {
        amplitude = 65;
        opacity = 0.9;
        waveColor = '#FF3B30'; // Red noise
      } else if (ancMode === 'ambient') {
        amplitude = 30;
        opacity = 0.7;
        waveColor = '#FFCC00'; // Amber ambient
      } else {
        amplitude = 4; // Near flat line
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

    return () => cancelAnimationFrame(animId);
  }, [ancMode]);

  return (
    <section id="anc-demo" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-charcoal-800 border-t border-b border-white/10 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-apple-blue/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-apple-blue/20 border border-apple-blue/40 text-apple-cyan text-xs font-semibold uppercase tracking-wider mb-4">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive Noise Cancellation Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Silence on Demand. <span className="text-gradient-cyan">Tested in Real-Time.</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70">
            Select a sound environment below to experience how dual Apple H1 chips and an 8-microphone array neutralize ambient noise.
          </p>
        </div>

        {/* Visualizer Canvas Container */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 mb-10 border border-white/10 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-xl ${ancMode === 'full' ? 'bg-apple-cyan/20 text-apple-cyan' : ancMode === 'ambient' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>
                {ancMode === 'full' ? <ShieldCheck className="w-6 h-6" /> : ancMode === 'ambient' ? <Radio className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {ancMode === 'full' ? '100% Active Noise Cancelling' : ancMode === 'ambient' ? 'Smart Transparency Mode' : 'Noise Cancellation OFF'}
                </h3>
                <p className="text-xs text-white/50">
                  {ancMode === 'full' ? 'Computational Audio Active (-42dB Peak Reduction)' : ancMode === 'ambient' ? 'Microphones pass external sound naturally so you hear your surroundings' : 'Unfiltered raw ambient noise environment'}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-2xl font-mono font-bold text-gradient-cyan">
                {ancMode === 'full' ? '-42 dB' : ancMode === 'ambient' ? '-18 dB' : '0 dB'}
              </span>
              <span className="block text-[10px] uppercase font-mono tracking-widest text-white/40">NOISE ATTENUATION</span>
            </div>
          </div>

          {/* Waveform Canvas */}
          <div className="w-full h-36 bg-black/60 rounded-2xl border border-white/10 overflow-hidden relative flex items-center justify-center">
            <canvas ref={canvasRef} width={800} height={144} className="w-full h-full" />
            <div className="absolute bottom-2 right-4 text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1">
              <Zap className="w-3 h-3 text-apple-cyan" />
              <span>Real-Time Computational Audio Signal</span>
            </div>
          </div>
        </div>

        {/* Mode Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => setAncMode('off')}
            className={`p-5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
              ancMode === 'off'
                ? 'bg-red-500/10 border-red-500/50 shadow-lg shadow-red-500/10'
                : 'glass-card hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <Volume2 className={`w-5 h-5 ${ancMode === 'off' ? 'text-red-400' : 'text-white/40'}`} />
              <span className="text-xs font-mono text-white/40">01</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">ANC OFF</h4>
              <p className="text-xs text-white/60">Hear full cabin pressure, engine roar & office noise.</p>
            </div>
          </button>

          <button
            onClick={() => setAncMode('ambient')}
            className={`p-5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
              ancMode === 'ambient'
                ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10'
                : 'glass-card hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <Radio className={`w-5 h-5 ${ancMode === 'ambient' ? 'text-amber-400' : 'text-white/40'}`} />
              <span className="text-xs font-mono text-white/40">02</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Transparency Mode</h4>
              <p className="text-xs text-white/60">Passes announcements & conversation naturally.</p>
            </div>
          </button>

          <button
            onClick={() => setAncMode('full')}
            className={`p-5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
              ancMode === 'full'
                ? 'bg-apple-blue/20 border-apple-cyan shadow-xl shadow-apple-cyan/20'
                : 'glass-card hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <ShieldCheck className={`w-5 h-5 ${ancMode === 'full' ? 'text-apple-cyan' : 'text-white/40'}`} />
              <span className="text-xs font-mono text-apple-cyan font-bold">03 (RECOMMENDED)</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">100% Industry-Leading ANC</h4>
              <p className="text-xs text-white/60">Complete sensory isolation for pure focus.</p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
