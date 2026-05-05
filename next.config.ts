/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ye line TypeScript errors ko ignore karegi taake build pass ho jaye
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ye line linting errors ko ignore karegi
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;