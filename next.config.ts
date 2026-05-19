import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
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
