"use client";

import { useState, useEffect } from "react";
import { Link, scroller } from "react-scroll";
import { LimelightNav } from "./ui/limelight-nav";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const navLinks = [
    { name: "Ana Sayfa", to: "hero" },
    { name: "Hakkımda", to: "about" },
    { name: "Deneyim", to: "experience" },
    { name: "Projeler", to: "projects" },
    { name: "İletişim", to: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Section tracking
      const sections = navLinks.map(link => document.getElementById(link.to));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveIndex(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = navLinks.map((link, index) => ({
    id: link.to,
    label: link.name,
    onClick: () => {
      setActiveIndex(index);
      scroller.scrollTo(link.to, { smooth: true, offset: -100, duration: 800 });
    }
  }));

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 flex justify-center mt-6 px-4 md:px-6 pointer-events-none`}
    >
      <div 
        className={`flex items-center gap-2 md:gap-8 rounded-full transition-all duration-500 overflow-hidden md:pr-0 pl-6 pointer-events-auto ${
          scrolled ? "bg-black/80 backdrop-blur-3xl border border-white/20 shadow-2xl shadow-black/50 py-1.5 pr-1.5" : "bg-transparent py-0"
        }`}
      >
        {/* Logo */}
        <Link
          to="hero"
          smooth={true}
          offset={-100}
          duration={800}
          className="text-white font-semibold tracking-tight cursor-pointer hidden md:block"
        >
          OĞUZHAN TÜRKMEN
        </Link>
        
        {/* Limelight Nav Menu */}
        <LimelightNav 
            items={items} 
            activeIndex={activeIndex}
            className={`${scrolled ? "border-transparent bg-transparent" : "border-white/10 bg-black/40"}`}
        />
      </div>
    </div>
  );
}
