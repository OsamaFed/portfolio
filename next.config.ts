import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["*.replit.dev", "*.kirk.replit.dev"],
};

export default nextConfig;
