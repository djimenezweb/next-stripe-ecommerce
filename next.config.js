/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: '**.stripe.com'
      },
      {
        protocol: 'https',
        hostname: 'files.stripe.com'
      },
      {
        protocol: 'https',
        hostname: '**.example.com'
      }
    ]
  }
};

module.exports = nextConfig;
