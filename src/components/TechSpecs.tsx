'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TECH_SPECS } from '@/lib/constants';
import { BatteryCharging, Cpu, Headphones, Zap, Sliders, X, Check, FileText } from 'lucide-react';

export default function TechSpecs() {
  const [modalOpen, setModalOpen] = useState(false);

  const fullSpecCategories = [
    {
      category: 'Acoustic Architecture',
      items: [
        { key: 'Driver Unit', val: '40mm Apple-designed dynamic driver' },
        { key: 'Magnet Type', val: 'Dual neodymium ring magnet motor' },
        { key: 'Canopy & Frame', val: 'Breathable knit mesh canopy & stainless steel frame' },
        { key: 'Ear Cushions', val: 'Acoustically engineered memory foam' },
      ],
    },
    {
      category: 'Noise Cancellation & Processors',
      items: [
        { key: 'Audio Processors', val: 'Apple H1 headphone chip in each ear cup (10 audio cores per chip)' },
        { key: 'Microphone Count', val: '9 total microphones (8 for Active Noise Cancellation, 3 for voice pickup)' },
        { key: 'Audio Controls', val: 'Digital Crown for volume, tracks, Siri & Noise Control button' },
        { key: 'Listening Modes', val: 'Active Noise Cancellation, Transparency Mode, Adaptive EQ' },
      ],
    },
    {
      category: 'Battery & Power Management',
      items: [
        { key: 'Battery Life (ANC ON)', val: 'Up to 20 Hours with ANC & Spatial Audio enabled' },
        { key: 'Power Saving', val: 'Smart Case ultra-low-power state preservation' },
        { key: 'Quick Charging', val: '5 minutes charge = 1.5 hours playback' },
        { key: 'Connector', val: 'Lightning / USB-C Charge Port' },
      ],
    },
    {
      category: 'Connectivity & Ecosystem',
      items: [
        { key: 'Wireless Tech', val: 'Bluetooth® 5.0 Wireless Technology' },
        { key: 'Sensors', val: 'Optical sensor, Position sensor, Case-detect sensor, Accelerometer, Gyroscope' },
        { key: 'Ecosystem Features', val: 'Automatic Device Switching, Audio Sharing, Personalized Spatial Audio' },
        { key: 'Voice Assistant', val: 'Always-On "Hey Siri" Hands-Free Activation' },
      ],
    },
  ];

  return (
    <section id="specs" className="relative py-16 sm:py-28 px-4 sm:px-6 lg:px-8 bg-void border-t border-white/10">
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-apple-cyan/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6">
          <div>
            <span className="text-xs font-semibold text-apple-cyan uppercase tracking-widest block mb-2 font-mono">
              SPECIFICATIONS & ARCHITECTURE
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Engineered to <span className="text-gradient-cyan">Outperform.</span>
            </h2>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center space-x-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full glass-card hover:bg-white/10 border border-white/15 text-xs sm:text-sm font-semibold text-white transition-all self-start md:self-auto"
          >
            <FileText className="w-4 h-4 text-apple-cyan" />
            <span>View Complete Spec Sheet</span>
          </button>
        </div>

        {/* High Impact Metric Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {TECH_SPECS.map((spec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass-card glass-card-hover p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-white/40 block mb-2">
                  {spec.label}
                </span>
                <span className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-gradient-cyan block mb-2 tracking-tight">
                  {spec.value}
                </span>
              </div>
              <span className="text-xs text-white/60 font-medium">{spec.sub}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Spec Sheet Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="glass-card w-full max-w-4xl max-h-[85vh] rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-white/20 overflow-y-auto relative shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-white/10 mb-6 sm:mb-8 sticky top-0 bg-charcoal-800/90 backdrop-blur-md pt-2 z-10">
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white">Apple AirPods Max Technical Datasheet</h3>
                  <p className="text-xs text-white/50">Official Engineering Specifications</p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {fullSpecCategories.map((cat, idx) => (
                  <div key={idx} className="space-y-3">
                    <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-apple-cyan font-mono">
                      {cat.category}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      {cat.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/5">
                          <span className="block text-xs text-white/50 mb-1">{item.key}</span>
                          <span className="block text-xs sm:text-sm font-semibold text-white/90">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setModalOpen(false)}
                  className="btn-gradient px-6 py-2.5 rounded-full text-xs font-semibold text-white"
                >
                  Close Spec Sheet
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
