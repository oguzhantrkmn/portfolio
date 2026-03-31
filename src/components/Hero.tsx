"use client";

import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { ParticleTextEffect } from "./ui/particle-text-effect";
import HandDrawnButton from "./ui/hand-drawn-button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20"
    >
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-8 items-center h-full max-w-7xl">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left z-10 order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 text-xs font-medium tracking-wide text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            Açık Pozisyonlara Hazır
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white mb-6 text-balance leading-tight">
            Geleceği Kodluyorum
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-xl font-light leading-relaxed">
            Mobil ve web geliştirme alanında uzmanlaşmış bir bilgisayar mühendisiyim. <strong className="font-medium text-white/90">Flutter, React Native, React.js</strong> ve <strong className="font-medium text-white/90">Laravel</strong> ile modern, ölçeklenebilir ve kullanıcı odaklı çözümler üretiyorum.
          </p>

          <div className="flex items-center gap-2 text-zinc-500 mb-10 text-sm tracking-wide">
            <MapPin size={16} />
            <span>Çerkezköy, Tekirdağ, Türkiye</span>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 mt-2 w-full max-w-full sm:w-auto">
            <HandDrawnButton href="#projects" text="Projelerimi Keşfet" />
            <HandDrawnButton href="#contact" text="İletişime Geç" />
          </div>
        </motion.div>

        {/* Right Content - Particle Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-full flex items-center justify-center w-full z-10 order-1 lg:order-2 pointer-events-none lg:pointer-events-auto mt-10 lg:mt-0"
        >
          <div className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[600px] aspect-square relative mr-0 lg:-mr-12 opacity-80 mix-blend-screen scale-110 lg:scale-100">
            <ParticleTextEffect words={["OĞUZHAN", "TÜRKMEN", "DEVELOPER", "Flutter", "React Native", "React.js", "Laravel", "Supabase"]} />
          </div>
        </motion.div>
      </div>

      {/* Modern gradient overlay to blend into the background gently */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] -z-10 mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] -z-10 mix-blend-screen" />
    </section>
  );
}
