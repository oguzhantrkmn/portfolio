import { skills } from "@/lib/data";
import Skill3DCard from "./ui/skill-3d-card";
import OrbitingSkills from "./ui/orbiting-skills";

export default function Skills() {
  return (
    <section id="skills" className="py-24 w-full">
      <div className="container mx-auto px-6 max-w-7xl">
         <div className="flex flex-col gap-4 mb-20">
             <span className="text-zinc-500 font-medium tracking-widest text-sm uppercase">Yetenekler</span>
             <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">Teknik Niteliklerim</h2>
         </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {skills.map((category, idx) => (
                <Skill3DCard 
                    key={idx}
                    title={category.category}
                    icon={category.icon}
                    color={category.color}
                    skills={category.items}
                />
            ))}
         </div>

         <div className="mt-20">
            <h3 className="text-xl font-medium text-white mb-10 tracking-tight text-center lg:text-left">Temel Yetkinliklerim</h3>
            <OrbitingSkills />
         </div>
      </div>
    </section>
  );
}
