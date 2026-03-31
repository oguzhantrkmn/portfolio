"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";

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

  // Background Text Scrolling (Moves from right to left)
  const textX = useTransform(scrollYProgress, [0, 1], ["100vw", "-150vw"]);

  // Subtle zoom-in effect for the video player as you scroll down
  const containerScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.05]);

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
      
      // Get the CSS-defined width and height of the canvas
      const rect = canvas.getBoundingClientRect();
      const cssWidth = rect.width;
      const cssHeight = rect.height;

      // Handle the case where the element hasn't been painted yet
      if (cssWidth === 0 || cssHeight === 0) return;

      // Set actual size in memory (scaled to account for extra pixel density)
      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;

      // Normalize coordinate system to use css pixels
      ctx.scale(dpr, dpr);

      // Enable high quality rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Calculate the scale to cover the container perfectly (which is 16:9 by CSS)
      const scale = Math.max(cssWidth / img.width, cssHeight / img.height);
      const x = (cssWidth / 2) - (img.width / 2) * scale;
      const y = (cssHeight / 2) - (img.height / 2) * scale;
      
      ctx.clearRect(0, 0, cssWidth, cssHeight);
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
    <div ref={containerRef} className="h-[400vh] w-full relative bg-transparent">
      {/* Inject Keyframe for the shining effect */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shootingStarText {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      ` }} />
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 sm:px-8 z-10">
        
        {/* Animated Background Text with Shooting Star Effect */}
        <motion.div 
          style={{ x: textX }}
          className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap z-0 pointer-events-none flex items-center"
        >
             <h1 className="text-[20vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-white to-zinc-900 bg-[length:200%_auto] opacity-30 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                 style={{ animation: 'shootingStarText 3s linear infinite' }}
             >
                 OĞUZHAN TÜRKMEN
             </h1>
        </motion.div>
        
        {/* Background Glowing Ambient Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-3xl h-[40vh] bg-blue-600/20 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] max-w-xl h-[30vh] bg-purple-600/20 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none mix-blend-screen translate-x-10 -translate-y-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] max-w-2xl h-[35vh] bg-sky-500/10 blur-[90px] rounded-full pointer-events-none translate-y-10 -translate-x-10"></div>

        {/* Cinematic 16:9 Wrapper */}
        <motion.div 
          style={{ scale: containerScale }}
          className="relative w-full max-w-5xl aspect-video rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(0,100,255,0.15)] border border-white/10 ring-1 ring-white/5 bg-zinc-950/80 backdrop-blur-sm z-10"
        >
          {imagesLoaded < 1 && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-950">
              <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          
          <canvas ref={canvasRef} className="w-full h-full block" />
          
          {/* Subtle inner shadow for depth feeling */}
          <div className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-[2rem] shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] z-10"></div>
        </motion.div>
        
        {/* Overlay content while animating */}
         <div className="absolute bottom-8 z-20 flex flex-col items-center justify-center opacity-80 pointer-events-none">
             <div className="w-[2px] h-10 sm:h-12 bg-white/20 relative overflow-hidden rounded-full mb-4">
                 <div className="absolute top-0 w-full h-1/2 bg-white animate-scroll-down rounded-full shadow-[0_0_10px_rgba(255,255,255,0.7)]"></div>
             </div>
             <p className="text-white/60 text-xs tracking-widest uppercase font-light">Kaydır</p>
         </div>
      </div>
    </div>
  );
}
