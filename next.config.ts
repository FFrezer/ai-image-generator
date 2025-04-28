import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
<<<<<<< HEAD
    domains: ['storage.googleapis.com', 'images.unsplash.com'], // Allow images from Unsplash and Google Cloud Storage
  },
  experimental: {
    optimizeFonts: true, // Enable font optimization (optional)
  },
  reactStrictMode: true, // Optional: Ensures better error handling in development
=======
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Allow images from Unsplash
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com", // Allow images from Google Cloud
      },
    ],
  },
  reactStrictMode: true,
>>>>>>> a1d5107 (Updated AI Image Generator)
};

export default nextConfig;
