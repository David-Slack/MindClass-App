/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // loader: 'custom',
    // loaderFile: 'components/loadingSpinner/LoadingSpinner.js',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'app.mindclass.co.uk',
      },
    ],
  },
  serverExternalPackages: ['firebase-admin'],
};

export default nextConfig;
