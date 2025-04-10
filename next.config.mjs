/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
        port: '',
        pathname: '/images/**',
        search: '',
      },
    ],
  },
  serverExternalPackages: ['firebase-admin'],
};

export default nextConfig;
