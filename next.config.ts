import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['storage.googleapis.com', 'images.unsplash.com'], // Allow images from Unsplash and Google Cloud Storage
  },
  experimental: {
    optimizeFonts: true, // Enable font optimization (optional)
  },
  reactStrictMode: true, // Optional: Ensures better error handling in development
};

export default nextConfig;
