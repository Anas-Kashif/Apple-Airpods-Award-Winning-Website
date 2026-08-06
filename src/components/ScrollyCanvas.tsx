'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
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

  // Draw frame helper
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const idx = Math.min(Math.max(0, Math.floor(frameIndex)), TOTAL_FRAMES - 1);
      const img = images[idx];

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const width = canvas.width;
      const height = canvas.height;

      // Clear with exact void background #020202
      ctx.fillStyle = '#020202';
      ctx.fillRect(0, 0, width, height);

      // Calculate object-fit: contain scaling with slight padding
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = width / height;

      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      // Keep product prominent & comfortable
      const scaleFactor = 0.85;

      if (canvasAspect > imgAspect) {
        // Canvas is wider than image
        drawHeight = height * scaleFactor;
        drawWidth = drawHeight * imgAspect;
        offsetX = (width - drawWidth) / 2;
        offsetY = (height - drawHeight) / 2;
      } else {
        // Canvas is taller than image
        drawWidth = width * scaleFactor;
        drawHeight = drawWidth / imgAspect;
        offsetX = (width - drawWidth) / 2;
        offsetY = (height - drawHeight) / 2;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

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

      drawFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Smooth lerp loop for buttery scroll frame transitions
  useEffect(() => {
    const targetFrame = Math.min(
      Math.max(0, Math.floor(scrollProgress * (TOTAL_FRAMES - 1))),
      TOTAL_FRAMES - 1
    );

    const renderLoop = () => {
      const diff = targetFrame - currentFrameRef.current;

      if (Math.abs(diff) > 0.01) {
        // Smooth lerp easing factor
        currentFrameRef.current += diff * 0.18;
        drawFrame(currentFrameRef.current);
        animationFrameIdRef.current = requestAnimationFrame(renderLoop);
      } else {
        currentFrameRef.current = targetFrame;
        drawFrame(targetFrame);
      }
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
  }, [scrollProgress, drawFrame]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-void overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-apple-blue/10 blur-[140px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-apple-cyan/5 blur-[100px] pointer-events-none" />

      {/* Main High-Performance Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none select-none z-10"
        style={{ width: '100vw', height: '100vh' }}
      />
    </div>
  );
}
