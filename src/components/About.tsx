import { personalInfo } from "@/lib/data";
import { ImageSwiper } from "./ui/image-swiper";
import { GraduationCap, MapPin, Globe, Trophy, Code2, Users } from "lucide-react";

export default function About() {
  const imageUrls = "/blog-logo.jpeg";

  return (
    <section id="about" className="py-24 w-full">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col gap-4 mb-16">
          <span className="text-zinc-500 font-medium tracking-widest text-sm uppercase">Hakkımda</span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">Benim Hikayem</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          <div className="flex flex-col gap-12">
            <div className="flex justify-center lg:justify-start items-center py-10 opacity-90 hover:opacity-100 transition-opacity">
              <ImageSwiper images={imageUrls} cardWidth={640} cardHeight={740} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-6 rounded-3xl flex flex-col gap-2">
                <div className="flex items-center gap-3 text-zinc-400 mb-2">
                  <Trophy size={18} />
                  <span className="font-medium uppercase tracking-wider text-xs">Tamamlanan Proje</span>
                </div>
                <div className="text-4xl font-semibold text-white">4+</div>
              </div>
              <div className="glass-panel p-6 rounded-3xl flex flex-col gap-2">
                <div className="flex items-center gap-3 text-zinc-400 mb-2">
                  <Users size={18} />
                  <span className="font-medium uppercase tracking-wider text-xs">Staj Deneyimi</span>
                </div>
                <div className="text-4xl font-semibold text-white">2+</div>
              </div>
              <div className="glass-panel p-6 rounded-3xl flex flex-col gap-2 col-span-2">
                <div className="flex items-center gap-3 text-zinc-400 mb-2">
                  <Code2 size={18} />
                  <span className="font-medium uppercase tracking-wider text-xs">Teknoloji & Araç</span>
                </div>
                <div className="text-4xl font-semibold text-white">10+</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 justify-center">
            <div className="prose prose-invert prose-lg text-zinc-400 max-w-none">
              <p className="leading-relaxed font-light">
                {personalInfo.summary}
              </p>
            </div>

            <div className="h-px w-full bg-white/10 my-4" />

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: MapPin, title: "Konum", value: personalInfo.location, highlight: false },
                { icon: Globe, title: "Dil", value: "Türkçe, İngilizce (B1)", highlight: false },
                { icon: GraduationCap, title: "Eğitim", value: "Hitit Üni. Bilgisayar Müh.", highlight: true },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center shrink-0 border border-white/5">
                    <item.icon size={16} className={item.highlight ? "text-blue-400" : "text-zinc-500"} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">{item.title}</div>
                    <div className="text-sm text-zinc-300 font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 glass-panel rounded-3xl p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <h3 className="text-white font-medium mb-1">Yeni fırsatlara ve iş birliklerine açık</h3>
                  <div className="text-sm text-zinc-400 font-light mt-1">Müsaitlik durumum aktif, detaylar için iletişime geçin.</div>
                </div>
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
