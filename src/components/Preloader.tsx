"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Artificial minimum delay for the premium loading animation
    // Allows Next.js to hydrate and hero scroll animation images to start preloading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          // Slide up smoothly when exiting
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} // Apple-style custom spring/ease curve
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-black text-white overflow-hidden pointer-events-auto"
        >
          {/* Animated Inner Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <h1 className="text-xs sm:text-sm tracking-[0.5em] text-white/80 uppercase font-light mb-8 select-none">
              Oğuzhan Türkmen
            </h1>
            
            {/* The progress line */}
            <div className="w-48 sm:w-64 h-[1px] bg-white/10 relative overflow-hidden rounded-full">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.1 }}
                className="absolute top-0 left-0 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] rounded-full"
              />
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-[9px] sm:text-[10px] tracking-[0.4em] text-white/40 uppercase mt-5 select-none"
            >
              Deneyim Yükleniyor...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
