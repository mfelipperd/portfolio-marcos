import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      { source: "/apuracao-belem", destination: "/apuracao-para", permanent: true },
      { source: "/api/apuracao-belem", destination: "/api/apuracao-para", permanent: true },
    ];
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      html2canvas: 'html2canvas-pro',
    };
    return config;
  },
  experimental: {
    turbo: {
      resolveAlias: {
        html2canvas: 'html2canvas-pro',
      },
    },
  } as any,
};

export default nextConfig;
