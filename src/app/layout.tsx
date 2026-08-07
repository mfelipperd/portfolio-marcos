import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Analytics from './analytics';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

// Removido Geist_Mono não utilizado

export const metadata: Metadata = {
  title: {
    default: 'Marcos Felippe - Desenvolvedor Fullstack | React, Node.js, Automação',
    template: '%s | Marcos Felippe - Fullstack Developer'
  },
  description: 'Portfólio de Marcos Felippe - Desenvolvedor Fullstack especializado em React, Node.js, TypeScript e tecnologias modernas. Explore meus projetos, habilidades técnicas e contribuições open-source.',
  keywords: [
    'desenvolvedor fullstack',
    'React developer',
    'Node.js developer',
    'desenvolvimento web',
    'automação n8n',
    'aplicação web',
    'Typebot',
    'Next.js',
    'TypeScript',
    'TailwindCSS',
    'PostgreSQL',
    'MongoDB',
    'AWS',
    'Vercel',
    'portfolio desenvolvedor',
    'desenvolvimento de software',
    'fullstack developer',
    'react developer',
    'nodejs developer'
  ],
  authors: [{ name: 'Marcos Felippe', url: 'https://marcosfelippe.dev' }],
  creator: 'Marcos Felippe',
  publisher: 'Marcos Felippe',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.mfelippe.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.mfelippe.com.br',
    siteName: 'Marcos Felippe - Fullstack Developer',
    title: 'Marcos Felippe - Desenvolvedor Fullstack | Portfólio',
    description: '👨‍💻 Portfólio de Marcos Felippe - Desenvolvedor Fullstack. Especializado em React, Node.js, TypeScript e tecnologias modernas. Explore projetos, habilidades e contribuições.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marcos Felippe - Desenvolvedor Fullstack 🚀',
    description: 'Portfólio de Marcos Felippe - Desenvolvedor Fullstack. React, Node.js, TypeScript e tecnologias modernas. Projetos, habilidades e contribuições open-source.',
    creator: '@mfelipperd',
    site: '@mfelipperd',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  classification: 'Portfolio de Desenvolvedor Fullstack',
  other: {
    'mobile-web-app-capable': 'yes',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable}`}>
      <head>
        {/* Preconnect para performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
        
        {/* DNS Prefetch para recursos externos */}
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />
        
        {/* Structured Data para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Marcos Felippe",
              "jobTitle": "Desenvolvedor Fullstack",
              "description": "Desenvolvedor Fullstack especializado em React, Node.js e automação. Crio soluções digitais que convertem e geram resultados reais.",
              "url": "https://www.mfelippe.com.br",
              "image": "https://avatars.githubusercontent.com/u/64865137?v=4",
              "sameAs": [
                "https://github.com/mfelipperd",
                "https://www.linkedin.com/in/mfelipperd/"
              ],
              "knowsAbout": [
                "React",
                "Next.js",
                "Node.js",
                "TypeScript",
                "JavaScript",
                "PostgreSQL",
                "MongoDB",
                "AWS",
                "Docker",
                "Automação",
                "n8n",
                "Typebot"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Freelancer"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "BR"
              },
            })
          }}
        />
        
        {/* Preload de recursos críticos */}
        <link rel="preload" href="https://avatars.githubusercontent.com/u/64865137?v=4" as="image" />
      </head>
      <body className={`${montserrat.variable}`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
