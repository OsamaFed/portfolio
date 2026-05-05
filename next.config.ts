import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    "*.replit.dev",
    "*.replit.app",
    "*.sisko.replit.dev",
    "*.kirk.replit.dev",
    "*.picard.replit.dev",
  ],
};

export default nextConfig;
