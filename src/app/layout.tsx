import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Analytics from './analytics';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
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
        url: '/og-image-marcos-felippe.jpg',
        width: 1200,
        height: 630,
        alt: 'Marcos Felippe - Desenvolvedor Fullstack Senior',
        type: 'image/jpeg',
      },
      {
        url: '/og-image-marcos-felippe-square.jpg',
        width: 800,
        height: 800,
        alt: 'Marcos Felippe - Fullstack Developer',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marcos Felippe - Desenvolvedor Fullstack Senior 🚀',
    description: 'Portfólio de Marcos Felippe - Desenvolvedor Fullstack Senior. React, Node.js, TypeScript e tecnologias modernas. Projetos, habilidades e contribuições open-source.',
    images: ['/twitter-card-marcos-felippe.jpg'],
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
    'theme-color': '#a259f7',
    'msapplication-TileColor': '#a259f7',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Marcos Felippe',
    'application-name': 'Marcos Felippe Portfolio',
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable}`}>
      <head>
        {/* Preconnect para performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
        
        {/* DNS Prefetch para recursos externos */}
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />
        
        {/* Favicon e ícones */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="manifest" href="/manifest.json" />
        
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
        
        {/* Meta tags adicionais para SEO */}
        <meta name="author" content="Marcos Felippe" />
        <meta name="copyright" content="Marcos Felippe" />
        <meta name="language" content="pt-BR" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="coverage" content="worldwide" />
        
        {/* Meta tags para redes sociais */}
        <meta property="og:site_name" content="Marcos Felippe - Fullstack Developer" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Marcos Felippe - Desenvolvedor Fullstack Senior | Transforme sua Ideia em Realidade Digital" />
        <meta property="og:description" content="🚀 Desenvolvedor Fullstack Senior especializado em React, Node.js e automação. Crio sites modernos, rápidos e que convertem visitantes em clientes. Sua ideia + minha expertise = Sucesso garantido!" />
        <meta property="og:url" content="https://marcosfelippe.dev" />
        <meta property="og:image" content="https://marcosfelippe.dev/og-image-marcos-felippe.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Marcos Felippe - Desenvolvedor Fullstack Senior" />
        
        {/* Twitter Card específico */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@mfelipperd" />
        <meta name="twitter:creator" content="@mfelipperd" />
        <meta name="twitter:title" content="Marcos Felippe - Desenvolvedor Fullstack Senior 🚀" />
        <meta name="twitter:description" content="Transforme sua ideia em realidade digital! Sites modernos, rápidos e que convertem. React, Node.js, automação n8n. Sua ideia + minha expertise = Sucesso!" />
        <meta name="twitter:image" content="https://marcosfelippe.dev/twitter-card-marcos-felippe.jpg" />
        <meta name="twitter:image:alt" content="Marcos Felippe - Fullstack Developer Portfolio" />
        
        {/* Meta tags para WhatsApp */}
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:secure_url" content="https://marcosfelippe.dev/og-image-marcos-felippe.jpg" />
        
        {/* Meta tags para LinkedIn */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Meta tags para Facebook */}
        <meta property="fb:app_id" content="seu-facebook-app-id" />
        
        {/* Preload de recursos críticos */}
        <link rel="preload" href="/og-image-marcos-felippe.jpg" as="image" />
        <link rel="preload" href="https://avatars.githubusercontent.com/u/64865137?v=4" as="image" />
        
        {/* Meta tags para performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#a259f7" />
        <meta name="msapplication-TileColor" content="#a259f7" />
        
        {/* Meta tags para acessibilidade */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="date=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="format-detection" content="email=no" />
      </head>
      <body className={`${geistSans.variable}`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
