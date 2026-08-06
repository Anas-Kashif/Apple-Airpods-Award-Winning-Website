/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['framer-motion', 'lucide-react'],
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
