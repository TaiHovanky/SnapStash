/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['knex'],
    serverActions: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'snapstash02.s3.amazonaws.com',
        port: '',
        pathname: '**',
      },
    ],
    domains: ['snapstash02.s3.amazonaws.com'],
  },
}

module.exports = nextConfig
