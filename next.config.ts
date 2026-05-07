import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Agar aapko build ke waqt errors ignore karne hain to ye rakhein, warna khali chod dein */
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;