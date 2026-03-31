"use client";

import { experience as experiences } from "@/lib/data";
import RadialOrbitalTimeline from "./ui/radial-orbital-timeline";
import { Briefcase, Link, LucideIcon } from "lucide-react";

export default function Experience() {
  
  const timelineData = experiences.map((exp, index) => ({
    id: index + 1,
    title: exp.role,
    date: exp.period,
    content: `${exp.company} - ${exp.location}`,
    category: exp.type === 'job' ? 'İş' : 'Eğitim',
    icon: Briefcase as LucideIcon,
    relatedIds: index === 0 ? [2] : (index === experiences.length - 1 ? [index] : [index, index + 2]),
    status: "completed" as const,
    energy: 100,
  }));

  if (timelineData.length > 0) {
      timelineData[timelineData.length - 1].relatedIds = [timelineData.length - 1];
  }

  return (
    <section id="experience" className="py-24 w-full relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col gap-4 mb-20 text-center">
          <span className="text-zinc-500 font-medium tracking-widest text-sm uppercase">Kariyer & Eğitim</span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">İş Deneyimim</h2>
        </div>

        <div className="w-full bg-[#0a0a0a] rounded-[30px] md:rounded-[40px] border border-white/5 overflow-hidden shadow-2xl relative min-h-[500px] md:min-h-[700px]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[90%] md:max-w-2xl h-[300px] md:h-[400px] bg-blue-500/10 blur-[90px] md:blur-[120px] rounded-full pointer-events-none" />
            <RadialOrbitalTimeline timelineData={timelineData} />
            <div className="absolute bottom-6 left-6 text-sm text-zinc-500 font-light tracking-wide opacity-50 pointer-events-none">
              * Düğümlere (Nodes) tıklayarak detaylı bilgileri görebilirsiniz.
            </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
            {experiences.map((exp, idx) => (
                <div key={idx} className="glass-panel rounded-3xl p-8 hover:bg-white/5 transition-colors border border-white/5 group">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-xl font-medium text-white mb-2">{exp.role}</h3>
                            <div className="text-zinc-400 font-light text-sm">{exp.company} • {exp.location}</div>
                        </div>
                        <div className="px-3 py-1 rounded-full border border-white/10 text-xs text-zinc-500 font-mono">
                            {exp.period}
                        </div>
                    </div>
                    <ul className="space-y-3">
                        {exp.responsibilities?.map((item, i) => (
                             <li key={i} className="text-zinc-400 text-sm font-light leading-relaxed flex items-start gap-3">
                                 <span className="text-blue-500/50 mt-1.5">•</span>
                                 {item}
                             </li>
                        ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/5">
                        {exp.tags?.map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-black/50 border border-white/10 rounded-lg text-xs text-zinc-400">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
