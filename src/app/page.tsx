import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { DottedSurface } from "@/components/ui/dotted-surface";

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen selection:bg-white/30 text-white font-sans font-light">
      {/* Premium Background */}
      <DottedSurface className="fixed inset-0 z-0" />
      
      <div className="relative z-10">
        <Navbar />
        <div className="space-y-32 sm:space-y-48 pb-32">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </div>
        <Footer />
      </div>
    </main>
  );
}
