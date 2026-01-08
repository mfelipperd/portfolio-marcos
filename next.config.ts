import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Configurações de SEO e Performance
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  
  // Configurações de imagens otimizadas
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'images.unsplash.com',
      'via.placeholder.com'
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 dias
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Configurações de headers para SEO e segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Configurações de redirecionamento para SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/portfolio',
        destination: '/#projetos',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/#sobre',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/#servicos',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/#contato',
        permanent: true,
      },
      {
        source: '/cv',
        destination: '/#sobre',
        permanent: true,
      },
      {
        source: '/resume',
        destination: '/#sobre',
        permanent: true,
      },
      {
        source: '/curriculo',
        destination: '/#sobre',
        permanent: true,
      },
      {
        source: '/desenvolvedor',
        destination: '/',
        permanent: true,
      },
      {
        source: '/programador',
        destination: '/',
        permanent: true,
      },
      {
        source: '/freelancer',
        destination: '/',
        permanent: true,
      },
      {
        source: '/react',
        destination: '/#tecnologias',
        permanent: true,
      },
      {
        source: '/nodejs',
        destination: '/#tecnologias',
        permanent: true,
      },
      {
        source: '/typescript',
        destination: '/#tecnologias',
        permanent: true,
      },
      {
        source: '/nextjs',
        destination: '/#tecnologias',
        permanent: true,
      },
      {
        source: '/landing-page',
        destination: '/#servicos',
        permanent: true,
      },
      {
        source: '/site-institucional',
        destination: '/#servicos',
        permanent: true,
      },
      {
        source: '/ecommerce',
        destination: '/#servicos',
        permanent: true,
      },
      {
        source: '/automacao',
        destination: '/#servicos',
        permanent: true,
      },
      {
        source: '/n8n',
        destination: '/#servicos',
        permanent: true,
      },
      {
        source: '/typebot',
        destination: '/#servicos',
        permanent: true,
      },
      {
        source: '/chatbot',
        destination: '/#servicos',
        permanent: true,
      },
      {
        source: '/whatsapp',
        destination: '/#servicos',
        permanent: true,
      },
    ];
  },

  // Configurações de rewrites para URLs amigáveis
  async rewrites() {
    return [
      {
        source: '/servicos/:slug',
        destination: '/#servicos',
      },
      {
        source: '/projetos/:slug',
        destination: '/#projetos',
      },
      {
        source: '/tecnologias/:slug',
        destination: '/#tecnologias',
      },
      {
        source: '/contato/:tipo',
        destination: '/#contato',
      },
      {
        source: '/orcamento',
        destination: '/#contato',
      },
      {
        source: '/consultoria',
        destination: '/#contato',
      },
      {
        source: '/freelance',
        destination: '/',
      },
      {
        source: '/desenvolvimento-web',
        destination: '/',
      },
      {
        source: '/criacao-sites',
        destination: '/',
      },
      {
        source: '/aplicacoes-web',
        destination: '/',
      },
    ];
  },

  // Configurações de experimental para performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons'],
  },

  // Configurações de webpack para otimização
  // Nota: Esta configuração é aplicada apenas quando usar Webpack (script padrão: npm run dev)
  // Quando usar Turbopack (npm run dev:turbo), esta configuração é ignorada automaticamente
  webpack: (config, { dev, isServer }) => {
    // Otimizações para produção apenas
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }

    return config;
  },

  // Configurações de TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },

  // Configurações de ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Configurações de output
  output: 'standalone',

  // Configurações de trailing slash
  trailingSlash: false,

  // Configurações de base path
  basePath: '',

  // Configurações de asset prefix
  assetPrefix: '',

  // Configurações de dist dir
  distDir: '.next',

  // Configurações de build
  // swcMinify: true, // Removido - não é mais necessário no Next.js 15

  // Configurações de compiler
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Configurações de env
  env: {
    CUSTOM_KEY: 'marcos-felippe-portfolio',
    SITE_NAME: 'Marcos Felippe - Fullstack Developer',
    SITE_URL: 'https://marcosfelippe.dev',
    CONTACT_EMAIL: 'contato@marcosfelippe.dev',
    PHONE_NUMBER: '+55 (11) 99999-9999',
    WHATSAPP_NUMBER: '+5511999999999',
    LINKEDIN_URL: 'https://www.linkedin.com/in/mfelipperd/',
    GITHUB_URL: 'https://github.com/mfelipperd',
  },
};

export default nextConfig;
