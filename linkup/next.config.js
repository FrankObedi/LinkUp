/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['cdn.discordapp.com', 'avatars.githubusercontent.com', 'images.unsplash.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
    ]
  },
}

module.exports = nextConfig 