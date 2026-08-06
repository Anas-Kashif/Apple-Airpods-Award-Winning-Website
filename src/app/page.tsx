'use client';

import React, { useState, useEffect, useRef } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import ScrollyCanvas from '@/components/ScrollyCanvas';
import StoryBeats from '@/components/StoryBeats';
import Hotspots from '@/components/Hotspots';
import AncSimulator from '@/components/AncSimulator';
import TechSpecs from '@/components/TechSpecs';
import ColorSelector from '@/components/ColorSelector';
import Footer from '@/components/Footer';

export default function Home() {
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[] | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Measure scroll progress relative to the 450vh sticky canvas section
  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollableHeight = rect.height - window.innerHeight;

      if (totalScrollableHeight <= 0) return;

      // Calculate progress from 0 (top of section) to 1 (bottom of sticky section)
      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(0, currentScroll / totalScrollableHeight), 1);

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial measure

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth Navigation click scrolling handler
  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'engineering') {
      const container = scrollContainerRef.current;
      if (container) {
        window.scrollTo({ top: container.offsetTop + window.innerHeight * 1.2, behavior: 'smooth' });
      }
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <main className="relative bg-void text-white min-h-screen selection:bg-apple-cyan/30 selection:text-white">
      {/* 1. Preloader Component */}
      {!loadedImages && <Preloader onComplete={(images) => setLoadedImages(images)} />}

      {/* 2. Top Navigation Bar */}
      <Navbar onNavClick={handleNavClick} />

      {/* 3. Sticky Scrollytelling Canvas Section (450vh height for narrative depth) */}
      {loadedImages && (
        <section ref={scrollContainerRef} className="relative h-[450vh] w-full bg-void">
          <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
            {/* HTML5 Canvas Frame Renderer */}
            <ScrollyCanvas
              images={loadedImages}
              scrollProgress={scrollProgress}
              onFrameUpdate={(frameIdx) => setCurrentFrame(frameIdx)}
            />

            {/* Narrative Overlays Synchronized with Scroll */}
            <StoryBeats
              scrollProgress={scrollProgress}
              onCtaClick={handleNavClick}
            />

            {/* Interactive Hotspots during Exploded Sequence */}
            <Hotspots scrollProgress={scrollProgress} />
          </div>
        </section>
      )}

      {/* 4. Interactive Feature Sections */}
      {loadedImages && (
        <>
          <AncSimulator />
          <TechSpecs />
          <ColorSelector />
          <Footer onNavClick={handleNavClick} />
        </>
      )}
    </main>
  );
}
