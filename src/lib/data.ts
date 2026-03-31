export const personalInfo = {
  name: "Oğuzhan Türkmen",
  title: "Bilgisayar Mühendisi & Full Stack Geliştirici",
  titleEn: "Computer Engineer & Full Stack Developer",
  location: "Çerkezköy, Tekirdağ",
  email: "oguzhantrkmn077@gmail.com",
  phone: "0542 622 9055",
  birthDate: "22 Eylül 2002",
  github: "https://github.com/oguzhantrkmn",
  linkedin: "https://linkedin.com/in/oguzhanturkmen",
  summary:
    "Mobil ve web geliştirme alanında uzmanlaşmış, Flutter ve React Native ile mobil uygulamalar, PHP, HTML, CSS, JavaScript, React.js ve Laravel ile web uygulamaları geliştiren bir yazılım geliştiricisiyim. MySQL ve Firebase veritabanları konusunda deneyimliyim. Temel düzeyde C# bilgisine sahibim. B1 seviyesinde İngilizce biliyorum. Ölçeklenebilir, yenilikçi ve kullanıcı odaklı yazılım çözümleri üretmeye odaklanıyorum.",
};

export const education = [
  {
    institution: "Hitit Üniversitesi",
    department: "Bilgisayar Mühendisliği",
    location: "Merkez, Çorum",
    period: "2021 - Haziran 2025",
    gpa: "2.53",
  },
];

export const experience = [
  {
    company: "Remora Teknopark",
    role: "Stajyer Yazılım Geliştirici",
    location: "Pendik, İstanbul",
    period: "Haz 2024 – Ağu 2024",
    type: "Staj",
    website: "https://remorateknopark.com",
    responsibilities: [
      "Gemi karınası temizleme robotu için mobil uygulama geliştirme",
      "Fonksiyonel yapı iyileştirmeleri ve kullanıcı deneyimi geliştirme",
    ],
    tags: ["Flutter", "Dart", "Mobile", "Robot API"],
  },
  {
    company: "YKK Metal Plastik",
    role: "IT Stajyer",
    location: "Çerkezköy, Tekirdağ",
    period: "Tem 2025 – Eyl 2025",
    type: "Staj",
    website: "#",
    responsibilities: [
      "Zorunlu IT stajı tamamlandı",
      "İç süreçler için React.js tabanlı web projesi geliştirildi",
      "ERP sistemleri hakkında temel eğitim alındı",
    ],
    tags: ["React.js", "JavaScript", "ERP", "IT"],
  },
];

export const projects = [
  {
    title: "CV Creater - Online",
    period: "Canlı Yayın",
    status: "Yayında",
    emoji: "📄",
    description:
      "Kullanıcıların profesyonel özgeçmişlerini tek bir ekranda hızlıca hazırlayıp, dinamik şablonlarla anında önizleme yaparak PDF olarak bilgisayarlarına indirebilecekleri web uygulaması.",
    technologies: ["React.js", "Tailwind CSS", "TypeScript", "PDF Generation", "Vite"],
    details: [
      "Canlı önizleme özellikli form alanları",
      "Modern ve yenilikçi kullanıcı arayüzü",
      "Oluşturulan cv'leri yüksek kalitede PDF formatında çıktı alma"
    ],
    github: "https://github.com/oguzhantrkmn",
    live: "https://cv-creater.online/",
    color: "#10b981",
  },
  {
    title: "TÜBİTAK - IoT Akıllı Kümes",
    period: "Eyl 2024 – Haz 2025",
    status: "Tamamlandı",
    emoji: "🐔",
    description:
      "Kümesler için IoT tabanlı otomasyon sistemi. Sensörlerle gerçek zamanlı veri toplama, buluta iletim ve mobil kontrol.",
    technologies: ["IoT", "Flutter", "Firebase", "Python", "Flask", "Raspberry Pi", "Arduino"],
    details: [
      "Sıcaklık, nem, ışık ve gaz sensörleri ile gerçek zamanlı veri toplama",
      "Verilerin Firebase'e iletilmesi ve otomatik havalandırma, ısıtma kontrolü",
      "Flutter ile izleme ve manuel müdahale için mobil arayüz",
      "Enerji verimliliği ve hayvan refahı artışı hedeflendi",
    ],
    github: "https://github.com/oguzhantrkmn",
    live: null,
    color: "#6366f1",
  },
  {
    title: "KentRapor",
    period: "Tem 2025 – Eki 2025",
    status: "Tamamlandı",
    emoji: "🏙️",
    description:
      "Vatandaşların belediyelere şehir arızalarını bildirdiği akıllı şehir uygulaması.",
    technologies: ["React Native", "Expo", "Node.js", "Express.js", "MySQL", "REST API", "JWT"],
    details: [
      "Fotoğraf yükleme, GPS konum alma ve rol bazlı giriş sistemi",
      "Vatandaş, belediye ve admin rolleri",
      "React Native + Expo ile cross-platform mobil geliştirme",
      "Node.js/Express REST API, MySQL veritabanı",
    ],
    github: "https://github.com/oguzhantrkmn",
    live: null,
    color: "#22c55e",
  },
  {
    title: "E-Shop",
    period: "Tem 2025 – Eyl 2025",
    status: "Tamamlandı",
    emoji: "🛍️",
    description:
      "Satıcıların ürün eklemesi, stok yönetimi ve satış yapması için çok katmanlı e-ticaret sistemi.",
    technologies: ["React", "Node.js", "MySQL", "Laravel", "PHP", "REST API"],
    details: [
      "Yöneticilerin platformu kontrol etmesi için admin paneli",
      "Ürün yönetimi, kategori yapısı, sipariş akışı",
      "Satıcı paneli ve admin paneli tasarımı",
      "Kullanıcı rolleri, güvenli kimlik doğrulama",
    ],
    github: "https://github.com/oguzhantrkmn",
    live: null,
    color: "#f59e0b",
  },
  {
    title: "KurbanPazarım",
    period: "Eyl 2024 – Nis 2025",
    status: "Tamamlandı",
    emoji: "🐄",
    description:
      "Kurban hayvanlarının online listelenmesi ve satın alınması için pazaryeri uygulaması.",
    technologies: ["Flutter", "Firebase", "Dart", "REST API", "Admin Panel"],
    details: [
      "Satıcı kaydı, ilan oluşturma ve yönetimi, fotoğraf-video yükleme",
      "Konum bazlı hayvan arama, fiyat ve kategori filtreleri",
      "Favoriler ve sipariş takibi",
      "Kullanıcı ve içerik moderasyonu için admin paneli",
    ],
    github: "https://github.com/oguzhantrkmn",
    live: null,
    color: "#ec4899",
  },
];

export const skills = [
  {
    category: "Frontend",
    icon: "⚛️",
    color: "#6366f1",
    items: [
      { name: "React.js", level: 88 },
      { name: "React Native", level: 85 },
      { name: "Flutter / Dart", level: 90 },
      { name: "HTML / CSS", level: 92 },
      { name: "Tailwind CSS", level: 80 },
      { name: "JavaScript", level: 87 },
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    color: "#22c55e",
    items: [
      { name: "Node.js", level: 78 },
      { name: "PHP / Laravel", level: 75 },
      { name: "Python / Flask", level: 70 },
      { name: "REST API", level: 88 },
      { name: "Express.js", level: 75 },
    ],
  },
  {
    category: "Veritabanı",
    icon: "🗄️",
    color: "#f59e0b",
    items: [
      { name: "MySQL", level: 82 },
      { name: "Firebase", level: 85 },
      { name: "PostgreSQL", level: 65 },
      { name: "SQL", level: 80 },
    ],
  },
  {
    category: "Araçlar & Diğer",
    icon: "🛠️",
    color: "#ec4899",
    items: [
      { name: "Git / GitHub", level: 85 },
      { name: "Expo", level: 82 },
      { name: "AWS (Temel)", level: 55 },
      { name: "C# (Temel)", level: 50 },
    ],
  },
];

export const certificates = [
  { name: "Bilgisayar Mühendisliği Lisans", issuer: "Hitit Üniversitesi", year: "2025" },
];
