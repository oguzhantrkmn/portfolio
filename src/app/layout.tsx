import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oğuzhan Türkmen | Full Stack Geliştirici",
  description:
    "Oğuzhan Türkmen - Bilgisayar Mühendisi & Full Stack Geliştirici. Flutter, React Native, React.js ve Laravel ile modern yazılım çözümleri geliştiriyorum.",
  keywords: [
    "Oğuzhan Türkmen",
    "Full Stack Developer",
    "React",
    "Flutter",
    "Bilgisayar Mühendisi",
    "Web Geliştirici",
    "Mobil Geliştirici",
  ],
  authors: [{ name: "Oğuzhan Türkmen" }],
  openGraph: {
    title: "Oğuzhan Türkmen | Full Stack Geliştirici",
    description:
      "Mobil ve web geliştirme alanında uzmanlaşmış bir yazılım geliştiricisi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`font-sans antialiased bg-black text-white selection:bg-white/20 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
