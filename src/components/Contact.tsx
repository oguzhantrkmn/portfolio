"use client";

import { useState, useEffect } from "react";
import { Copy, Mail, MapPin, Check } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { GlowCard } from "./ui/spotlight-card";
import SendButton from "./ui/send-button";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" });
      alert("Mesajınız başarıyla gönderildi!");
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 w-full">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col gap-4 mb-20 text-center">
            <span className="text-zinc-500 font-medium tracking-widest text-sm uppercase">İletişim</span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">Birlikte Çalışalım</h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Left Column: Direct Contact Info */}
            <div className="lg:col-span-2 flex flex-col gap-8 justify-center">
                <div>
                   <h3 className="text-2xl font-medium text-white mb-4 tracking-tight">Yeni bir projeye mi başlıyorsunuz?</h3>
                   <p className="text-zinc-400 font-light leading-relaxed mb-10">
                       İster bir web uygulaması, ister mobil uygulama... Tasarım, geliştirme veya mimari konularında konuşmak için çekinmeyin. Size geri dönüş yapacağım.
                   </p>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-6 group">
                        <div className="w-14 h-14 rounded-full glass-panel border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/5 transition-colors">
                            <Mail size={20} className="text-white/70" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-1">E-Posta Adresi</p>
                            <div className="flex items-center gap-3">
                                <a href={`mailto:${personalInfo.email}`} className="text-lg font-medium text-zinc-200 hover:text-white transition-colors">
                                    {personalInfo.email}
                                </a>
                                <button 
                                  onClick={handleCopyEmail}
                                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                  title="E-postayı kopyala"
                                >
                                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-zinc-400" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 group">
                        <div className="w-14 h-14 rounded-full glass-panel border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/5 transition-colors">
                            <MapPin size={20} className="text-white/70" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-1">Konum</p>
                            <p className="text-lg font-medium text-zinc-200">Çerkezköy, Tekirdağ</p>
                            <p className="text-sm font-light text-zinc-500 mt-1">Uzaktan çalışmaya uygun</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Contact Form Area */}
            <div className="lg:col-span-3">
                 <GlowCard customSize className="p-8 md:p-10 h-full block" glowColor="blue">
                     <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-full justify-center">
                         <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Adınız</label>
                                  <input 
                                     type="text" 
                                     id="name"
                                     required
                                     value={formData.name}
                                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                                     className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                                     placeholder="Örn: John Doe"
                                  />
                              </div>
                              <div className="space-y-2">
                                  <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-zinc-500">E-Posta</label>
                                  <input 
                                     type="email" 
                                     id="email"
                                     required
                                     value={formData.email}
                                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                                     className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                                     placeholder="ornek@mail.com"
                                  />
                              </div>
                         </div>
                         <div className="space-y-2 flex-grow flex flex-col">
                              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Mesajınız</label>
                              <textarea 
                                 id="message"
                                 required
                                 value={formData.message}
                                 onChange={(e) => setFormData({...formData, message: e.target.value})}
                                 rows={5}
                                 className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-colors resize-none flex-grow"
                                 placeholder="Projenizden veya fikrinizden bahsedin..."
                              />
                         </div>
                         <SendButton isSubmitting={isSubmitting} />
                     </form>
                 </GlowCard>
            </div>
        </div>
      </div>
    </section>
  );
}
