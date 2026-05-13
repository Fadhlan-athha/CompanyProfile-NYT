import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/site/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Next Young Tecnology | Solusi Digital Profesional",
    template: "%s | Next Young Tecnology"
  },
  description:
    "Next Young Tecnology membantu bisnis membangun website, sistem informasi, UI/UX, dan solusi digital yang rapi, responsif, aman, dan mudah dikembangkan.",
  keywords: [
    "Next Young Tecnology",
    "website company profile",
    "website toko online",
    "sistem informasi bisnis",
    "UI UX design",
    "maintenance website",
    "konsultasi digitalisasi bisnis"
  ],
  authors: [{ name: "Next Young Tecnology" }],
  creator: "Next Young Tecnology",
  openGraph: {
    title: "Next Young Tecnology | Solusi Digital Profesional",
    description:
      "Company profile untuk perusahaan teknologi dan solusi digital yang membantu bisnis tumbuh dengan sistem yang siap digunakan.",
    siteName: "Next Young Tecnology",
    locale: "id_ID",
    type: "website"
  },
  icons: {
    icon: "/favicon.svg"
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07111f"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
