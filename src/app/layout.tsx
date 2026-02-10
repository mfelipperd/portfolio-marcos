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
    default: 'Marcos Felippe - Desenvolvedor Fullstack Senior | React, Node.js, Automação',
    template: '%s | Marcos Felippe - Fullstack Developer'
  },
  description: 'Portfólio de Marcos Felippe - Desenvolvedor Fullstack Senior especializado em React, Node.js, TypeScript e tecnologias modernas. Explore meus projetos, habilidades técnicas e contribuições open-source.',
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
  metadataBase: new URL('https://marcosfelippe.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://marcosfelippe.dev',
    siteName: 'Marcos Felippe - Fullstack Developer',
    title: 'Marcos Felippe - Desenvolvedor Fullstack Senior | Portfólio',
    description: '👨‍💻 Portfólio de Marcos Felippe - Desenvolvedor Fullstack Senior. Especializado em React, Node.js, TypeScript e tecnologias modernas. Explore projetos, habilidades e contribuições.',
    images: [
      {
        url: '/og-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Marcos Felippe - Desenvolvedor Fullstack Senior',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marcos Felippe - Desenvolvedor Fullstack Senior 🚀',
    description: 'Portfólio de Marcos Felippe - Desenvolvedor Fullstack Senior. React, Node.js, TypeScript e tecnologias modernas. Projetos, habilidades e contribuições open-source.',
    images: ['/og-preview.jpg'],
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
  verification: {
    google: 'seu-google-verification-code',
    yandex: 'seu-yandex-verification-code',
    yahoo: 'seu-yahoo-verification-code',
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
        
        {/* Favicon e ícones */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Structured Data para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Marcos Felippe",
              "jobTitle": "Desenvolvedor Fullstack Senior",
              "description": "Desenvolvedor Fullstack especializado em React, Node.js e automação. Crio soluções digitais que convertem e geram resultados reais.",
              "url": "https://marcosfelippe.dev",
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
        
        {/* Meta tags para WhatsApp e Facebook que requerem propriedades específicas não cobertas pelo Next.js Metadata padrão */}
        <meta property="fb:app_id" content="seu-facebook-app-id" />
        
        {/* Preload de recursos críticos */}
        <link rel="preload" href="/og-preview.jpg" as="image" />
        <link rel="preload" href="https://avatars.githubusercontent.com/u/64865137?v=4" as="image" />
      </head>
      <body className={`${montserrat.variable}`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
