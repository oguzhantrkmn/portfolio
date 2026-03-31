import { personalInfo } from "@/lib/data";
import CvDownloadButton from "./ui/cv-download-button";
import { SocialLinks } from "./ui/social-links";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 w-full border-t border-white/10 bg-black backdrop-blur-3xl relative z-10 mt-10">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8 text-sm">
        
        <div className="flex flex-col items-center md:items-start flex-1">
             <span className="font-semibold text-white tracking-wider text-base mb-1">O. Türkmen</span>
             <span className="text-zinc-500 font-light">© {currentYear} Tüm hakları saklıdır.</span>
        </div>

        <div className="flex justify-center flex-1 scale-90 md:scale-100">
            <CvDownloadButton />
        </div>

        <div className="flex gap-6 flex-1 justify-center md:justify-end scale-90 origin-right">
             <SocialLinks />
        </div>

      </div>
    </footer>
  );
}
