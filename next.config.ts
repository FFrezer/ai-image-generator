import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
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
  reactStrictMode: true, // Optional: Ensures better error handling in development
};

export default nextConfig;
