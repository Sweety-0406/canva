import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"], 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "r9oqigd198.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
