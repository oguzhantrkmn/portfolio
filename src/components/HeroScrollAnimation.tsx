"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 224;

export default function HeroScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));

  // useScroll tracks scroll progress over the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map progress (0 to 1) to frame index (1 to FRAME_COUNT)
  const currentFrameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

  useEffect(() => {
    // Preload all images
    let loaded = 0;
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      // Format number to 3 digits (e.g., 001, 024, 150)
      const frameNum = i.toString().padStart(3, "0");
      img.src = `/videoss/ezgif-frame-${frameNum}.jpg`;
      img.onload = () => {
        loaded++;
        setImagesLoaded(loaded);
        imagesRef.current[i - 1] = img;
        
        // Draw first frame as soon as it loads
        if (i === 1) {
          drawFrame(0);
        }
      };
      imagesRef.current[i - 1] = img; // Temporarily assign it even if not loaded
    }
  }, []);

  const drawFrame = (index: number) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (img && img.complete && img.naturalHeight !== 0) {
      const dpr = window.devicePixelRatio || 1;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Set actual size in memory (scaled to account for extra pixel density)
      canvas.width = screenWidth * dpr;
      canvas.height = screenHeight * dpr;

      // Normalize coordinate system to use css pixels
      ctx.scale(dpr, dpr);

      // Scale the container down with CSS to match the logical size
      canvas.style.width = `${screenWidth}px`;
      canvas.style.height = `${screenHeight}px`;

      // Enable high quality rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Calculate the scale to cover the screen (like object-fit: cover)
      const scale = Math.max(screenWidth / img.width, screenHeight / img.height);
      const x = (screenWidth / 2) - (img.width / 2) * scale;
      const y = (screenHeight / 2) - (img.height / 2) * scale;
      
      ctx.clearRect(0, 0, screenWidth, screenHeight);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
  };

  useMotionValueEvent(currentFrameIndex, "change", (latest) => {
    // latest will be a float between 1 and FRAME_COUNT
    const frameIndex = Math.floor(latest) - 1; // 0-indexed array
    drawFrame(frameIndex);
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const latestFrame = Math.floor(currentFrameIndex.get()) - 1;
      drawFrame(Math.max(0, latestFrame));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentFrameIndex]);

  return (
    <div ref={containerRef} className="h-[400vh] w-full relative bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {imagesLoaded < 1 && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
        
        {/* Optional overlay gradient to smoothly transition out or in */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 to-black/60 z-10"></div>
        
        {/* Overlay content while animating */}
         <div className="absolute inset-x-0 bottom-10 z-20 flex flex-col items-center justify-center opacity-80 pointer-events-none">
             <div className="w-[2px] h-12 bg-white/20 relative overflow-hidden rounded-full mb-4">
                 <div className="absolute top-0 w-full h-1/2 bg-white animate-scroll-down rounded-full shadow-[0_0_10px_rgba(255,255,255,0.7)]"></div>
             </div>
             <p className="text-white/60 text-xs tracking-widest uppercase font-light">Kaydır</p>
         </div>
      </div>
    </div>
  );
}
