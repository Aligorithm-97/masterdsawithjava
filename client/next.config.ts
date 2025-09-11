import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Ensure app router features are default (Next 13+)
  experimental: {
    // serverActions: { allowedOrigins: ["localhost:3000"] }, // enable if needed later
  },
  images: {
    remotePatterns: [
      // add your API or CDN domains here when using <Image>
    ],
  },
};

export default nextConfig;
