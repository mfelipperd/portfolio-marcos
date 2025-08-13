import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marcos Felippe | Programador Fullstack React & Node",
  description: "Portfólio de Marcos Felippe, desenvolvedor fullstack especializado em React, Node.js e criação de sites profissionais. Contrate para seu projeto!",
  keywords: [
    "Marcos Felippe",
    "Programador Fullstack",
    "React",
    "Node.js",
    "Desenvolvedor Web",
    "Criação de Sites",
    "Portfólio",
    "Sites Profissionais",
    "Freelancer"
  ],
  openGraph: {
    title: "Marcos Felippe | Programador Fullstack React & Node",
    description: "Portfólio de Marcos Felippe, desenvolvedor fullstack especializado em React, Node.js e criação de sites profissionais.",
    url: "https://seu-dominio.com", // Troque para seu domínio real
    siteName: "Marcos Felippe Portfolio",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-purple-100 dark:bg-black dark:text-purple-100 transition-colors duration-300`}
        style={{ minHeight: '100vh' }}
      >
        {/* Toggle darkmode pode ser adicionado aqui futuramente */}
        {children}
      </body>
    </html>
  );
}
