'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { TOTAL_FRAMES } from '@/lib/constants';

interface ScrollyCanvasProps {
  images: HTMLImageElement[];
  scrollProgress: number; // 0 to 1
  onFrameUpdate?: (frameIndex: number) => void;
}

export default function ScrollyCanvas({
  images,
  scrollProgress,
  onFrameUpdate,
}: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentFrameRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const scrollProgressRef = useRef<number>(scrollProgress);

  // Synchronize ref for animation loop
  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  // Draw frame helper with dynamic Hero offset & subtle floating animation
  const drawFrame = useCallback(
    (frameIndex: number, timeMs: number = 0) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const idx = Math.min(Math.max(0, Math.floor(frameIndex)), TOTAL_FRAMES - 1);
      const img = images[idx];

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const width = canvas.width;
      const height = canvas.height;
      const dpr = window.devicePixelRatio || 1;
      const isDesktop = width / dpr >= 1024;
      const isTablet = width / dpr >= 768 && width / dpr < 1024;

      // Clear with exact void background #020202
      ctx.fillStyle = '#020202';
      ctx.fillRect(0, 0, width, height);

      // Calculate base image dimensions (object-fit: contain)
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = width / height;

      // Base scale factor: on hero desktop, scale product to occupy 55-60% viewport width
      const p = scrollProgressRef.current;
      // heroWeight is 1 at top (0-0.12) and smoothly fades to 0 by 0.25
      const heroWeight = Math.max(0, Math.min(1, (0.25 - p) / 0.13));

      let scaleFactor = 0.85;
      if (isDesktop && heroWeight > 0) {
        // Larger render in hero state on desktop (occupying ~60% width)
        const heroScale = 0.95;
        scaleFactor = scaleFactor * (1 - heroWeight) + heroScale * heroWeight;
      } else if (!isDesktop && !isTablet && heroWeight > 0) {
        // Mobile portrait mode: optimal scaling so headphones fit nicely with hero text
        const mobileScale = 0.76;
        scaleFactor = scaleFactor * (1 - heroWeight) + mobileScale * heroWeight;
      }

      let drawWidth = width;
      let drawHeight = height;

      if (canvasAspect > imgAspect) {
        drawHeight = height * scaleFactor;
        drawWidth = drawHeight * imgAspect;
      } else {
        drawWidth = width * scaleFactor;
        drawHeight = drawWidth / imgAspect;
      }

      // Default centered offsets
      const centeredX = (width - drawWidth) / 2;
      const centeredY = (height - drawHeight) / 2;

      // Hero specific right-aligned position calculation
      let heroX = centeredX;
      let heroY = centeredY;

      if (isDesktop) {
        // Position product on right side with slight overflow outside right edge
        heroX = width * 0.64 - drawWidth * 0.45;
      } else if (isTablet) {
        heroX = width * 0.58 - drawWidth * 0.45;
      } else {
        // Mobile: push down so title top has clear breathing space
        heroY = centeredY + height * 0.10;
      }

      // Interpolate between hero offset and centered offset based on heroWeight
      const finalX = centeredX * (1 - heroWeight) + heroX * heroWeight;

      // Subtle continuous vertical floating animation (very soft)
      const floatAmplitude = 12 * dpr * heroWeight;
      const floatOffset = Math.sin(timeMs * 0.002) * floatAmplitude;
      const finalY = (centeredY * (1 - heroWeight) + heroY * heroWeight) + floatOffset;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, finalX, finalY, drawWidth, drawHeight);

      if (onFrameUpdate) {
        onFrameUpdate(idx);
      }
    },
    [images, onFrameUpdate]
  );

  // Resize canvas to match window + DPR
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      drawFrame(currentFrameRef.current, performance.now());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Smooth render loop for frame lerp + continuous subtle floating animation
  useEffect(() => {
    let startTime = performance.now();

    const renderLoop = (timeMs: number) => {
      const p = scrollProgressRef.current;
      const targetFrame = Math.min(
        Math.max(0, Math.floor(p * (TOTAL_FRAMES - 1))),
        TOTAL_FRAMES - 1
      );

      const diff = targetFrame - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.18;
      } else {
        currentFrameRef.current = targetFrame;
      }

      drawFrame(currentFrameRef.current, timeMs - startTime);
      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [drawFrame]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-void overflow-hidden">
      {/* Soft Radial Background Glow behind AirPods Max */}
      <div
        className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,113,227,0.18)_0%,rgba(0,214,255,0.05)_45%,transparent_70%)] blur-[90px] pointer-events-none transition-opacity duration-700 z-0"
        style={{ opacity: scrollProgress <= 0.22 ? 1 : 0.2 }}
      />
      <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-apple-blue/5 blur-[120px] pointer-events-none z-0" />

      {/* Main High-Performance Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none select-none z-10"
        style={{ width: '100vw', height: '100vh' }}
      />
    </div>
  );
}
