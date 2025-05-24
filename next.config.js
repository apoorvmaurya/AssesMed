/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { 
    domains: ['images.pexels.com', 'lh3.googleusercontent.com'],
    unoptimized: process.env.NODE_ENV !== 'production'
  },
};

module.exports = nextConfig;