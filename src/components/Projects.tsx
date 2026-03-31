"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import { ExternalLink, Activity } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import GithubStarButton from "./ui/github-star-button";
import ProjectFlipCard from "./ui/project-flip-card";

export default function Projects() {
  const [filter, setFilter] = useState("Tümü");
  
  const categories = ["Tümü", "Yayında", "Devam Ediyor", "Tamamlandı"];
  const filteredProjects = projects.filter((p) => {
    if (filter === "Tümü") return true;
    if (filter === "Yayında") return p.status === "Yayında";
    if (filter === "Devam Ediyor") return p.status === "Devam Ediyor";
    if (filter === "Tamamlandı") return p.status === "Tamamlandı";
    return true;
  });

  return (
    <section id="projects" className="py-24 w-full">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col gap-4 mb-16 text-center">
             <span className="text-zinc-500 font-medium tracking-widest text-sm uppercase">Portfolyo</span>
             <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">Öne Çıkan Projeler</h2>
        </div>

        <div className="flex justify-center mb-16 w-full">
          <div className="flex flex-wrap justify-center items-center gap-2 p-1.5 glass-panel rounded-3xl md:rounded-full border border-white/5 mx-2 md:mx-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  filter === cat
                    ? "bg-white text-black shadow-lg"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           <AnimatePresence mode="popLayout">
             {filteredProjects.map((project, index) => (
                 <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                 >
                    <ProjectFlipCard 
                        title={project.title}
                        description={project.description}
                        status={project.status}
                        technologies={project.technologies}
                        github={project.github}
                        live={project.live}
                    />
                 </motion.div>
             ))}
           </AnimatePresence>
        </div>

        <div className="mt-20 flex justify-center">
            <GithubStarButton href="https://github.com/oguzhantrkmn" text="Daha fazlası için GitHub'ı ziyaret et" />
        </div>
      </div>
    </section>
  );
}
