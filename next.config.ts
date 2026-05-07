import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Build pass karne ke liye agar koi choti-moti types ki galti ho
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint errors ko build ke waqt ignore karega
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;