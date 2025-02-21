/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['fonts.gstatic.com', 'fonts.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/**',
      },
    ],
  },
  poweredByHeader: false,
  generateEtags: true,
};

module.exports = nextConfig;