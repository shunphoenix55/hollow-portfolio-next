import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shunphoenix55.github.io',
        pathname: '/assets/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'sulakshanamonga.com',
        pathname: '/cdn/shop/products/2_ce6969ce-cd85-4d51-a7b7-bd9c54e4df88.jpg',
        search: '?v=1663138104&width=1200',
      },
    ],
  },
  turbopack: {
    rules: {
      'globals.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;
