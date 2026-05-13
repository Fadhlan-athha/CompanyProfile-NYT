import {
  BarChart3,
  Brush,
  Building2,
  CheckCircle2,
  Code2,
  Gauge,
  Headphones,
  LayoutDashboard,
  LockKeyhole,
  LucideIcon,
  MessageSquareText,
  PanelsTopLeft,
  PenTool,
  SearchCheck,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Wrench
} from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
  description: string;
};

export type Service = {
  title: string;
  slug: string;
  description: string;
  icon: LucideIcon;
};

export type Reason = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type PortfolioItem = {
  title: string;
  slug: string;
  category: string;
  description: string;
  deliverables: string[];
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const navLinks: NavLink[] = [
  { label: "Tentang", href: "/#about" },
  { label: "Layanan", href: "/#services" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Solusi", href: "/#solutions" },
  { label: "Proses", href: "/#process" },
  { label: "Kontak", href: "/#contact" }
];

export const stats: Stat[] = [
  {
    value: "6",
    label: "Fokus layanan utama",
    description: "Dari website sampai sistem informasi bisnis."
  },
  {
    value: "100%",
    label: "Responsive-first",
    description: "Tampilan dipikirkan sejak mobile, tablet, dan desktop."
  },
  {
    value: "3",
    label: "Lapisan review",
    description: "Struktur, antarmuka, dan kesiapan teknis sebelum rilis."
  },
  {
    value: "30",
    label: "Hari pendampingan awal",
    description: "Masa transisi agar tim lebih nyaman memakai solusi baru."
  }
];

export const services: Service[] = [
  {
    title: "Website Company Profile",
    slug: "website-company-profile",
    description:
      "Membangun wajah digital perusahaan yang cepat, mudah dipahami, dan memperkuat kredibilitas bisnis.",
    icon: Building2
  },
  {
    title: "Website Toko Online",
    slug: "website-toko-online",
    description:
      "Katalog produk, alur pemesanan, dan halaman penjualan yang rapi untuk membantu transaksi berjalan lebih tertata.",
    icon: ShoppingBag
  },
  {
    title: "Sistem Informasi Bisnis",
    slug: "sistem-informasi-bisnis",
    description:
      "Dashboard, pencatatan, approval, dan laporan internal yang dibuat sesuai proses kerja perusahaan.",
    icon: LayoutDashboard
  },
  {
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description:
      "Desain antarmuka yang jelas, konsisten, dan nyaman digunakan oleh pelanggan maupun tim operasional.",
    icon: PenTool
  },
  {
    title: "Maintenance Website",
    slug: "maintenance-website",
    description:
      "Perawatan konten, keamanan dasar, pengecekan performa, dan penyesuaian kecil agar website tetap stabil.",
    icon: Wrench
  },
  {
    title: "Konsultasi Digitalisasi Bisnis",
    slug: "konsultasi-digitalisasi-bisnis",
    description:
      "Membantu memetakan kebutuhan, prioritas, dan solusi digital yang realistis untuk tahap bisnis Anda saat ini.",
    icon: MessageSquareText
  }
];

export const reasons: Reason[] = [
  {
    title: "Mulai dari kebutuhan bisnis",
    description:
      "Setiap fitur dirancang dari masalah yang ingin diselesaikan, bukan sekadar mengikuti tren visual.",
    icon: SearchCheck
  },
  {
    title: "Struktur teknis mudah dikembangkan",
    description:
      "Komponen, konten, dan halaman disusun agar mudah dirawat saat layanan atau tim Anda bertambah.",
    icon: Code2
  },
  {
    title: "Performa dan keamanan dasar diperhatikan",
    description:
      "Website dibuat ringan, responsif, dan menyiapkan fondasi yang lebih aman untuk kebutuhan produksi.",
    icon: ShieldCheck
  },
  {
    title: "Komunikasi kerja yang transparan",
    description:
      "Tahapan, prioritas, dan hasil kerja dijelaskan dengan bahasa yang mudah dipahami oleh pemilik bisnis.",
    icon: CheckCircle2
  }
];

export const portfolio: PortfolioItem[] = [
  {
    title: "Corporate Presence System",
    slug: "corporate-presence-system",
    category: "Company Profile",
    description:
      "Website profil perusahaan dengan struktur layanan, artikel, formulir prospek, dan analytics dasar.",
    deliverables: ["Landing page", "CMS ringan", "SEO teknis", "Form prospek"]
  },
  {
    title: "Commerce Catalog Platform",
    slug: "commerce-catalog-platform",
    category: "Toko Online",
    description:
      "Etalase produk yang membantu pelanggan memahami produk, mengirim pesanan, dan menghubungi sales lebih cepat.",
    deliverables: ["Katalog produk", "Filter kategori", "Alur order", "Integrasi kontak"]
  },
  {
    title: "Operational Dashboard",
    slug: "operational-dashboard",
    category: "Sistem Bisnis",
    description:
      "Dashboard internal untuk mencatat pekerjaan, memantau status, dan membuat laporan operasional berkala.",
    deliverables: ["Role akses", "Status tracking", "Export data", "Ringkasan laporan"]
  },
  {
    title: "Service Booking Portal",
    slug: "service-booking-portal",
    category: "Digital Workflow",
    description:
      "Portal pemesanan layanan dengan formulir terstruktur, validasi data, dan notifikasi untuk tim terkait.",
    deliverables: ["Form layanan", "Validasi data", "Notifikasi", "Riwayat permintaan"]
  }
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    description:
      "Mengenali tujuan bisnis, target pengguna, proses berjalan, dan batasan teknis yang perlu dipertimbangkan.",
    icon: SearchCheck
  },
  {
    step: "02",
    title: "Planning",
    description:
      "Menyusun ruang lingkup, struktur halaman, prioritas fitur, dan timeline kerja yang realistis.",
    icon: PanelsTopLeft
  },
  {
    step: "03",
    title: "Design",
    description:
      "Membuat arah visual, layout utama, dan pengalaman pengguna yang bersih serta mudah dinavigasi.",
    icon: Brush
  },
  {
    step: "04",
    title: "Development",
    description:
      "Mengembangkan website atau sistem dengan struktur kode yang rapi, responsif, dan siap dikembangkan.",
    icon: Settings2
  },
  {
    step: "05",
    title: "Quality Check",
    description:
      "Memeriksa tampilan, aksesibilitas dasar, performa, konten, form, dan perilaku di berbagai ukuran layar.",
    icon: Gauge
  },
  {
    step: "06",
    title: "Launch & Support",
    description:
      "Membantu proses rilis, dokumentasi singkat, dan pendampingan awal setelah solusi digunakan.",
    icon: Headphones
  }
];

export const capabilityHighlights = [
  { label: "Website cepat", icon: Gauge },
  { label: "UI rapi", icon: Sparkles },
  { label: "Data terstruktur", icon: BarChart3 },
  { label: "Dasar keamanan", icon: LockKeyhole },
  { label: "Siap dikembangkan", icon: Store }
];
