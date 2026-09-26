/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
  async headers() {
    const assetCache = {
      key: 'Cache-Control',
      value: 'public, max-age=604800, stale-while-revalidate=2592000',
    }

    return [
      { source: '/events/:path*\\.(png|svg|webp|avif)', headers: [assetCache] },
      { source: '/cursors/:path*\\.(svg|png|webp|avif)', headers: [assetCache] },
      { source: '/icon.svg', headers: [assetCache] },
    ]
  },
}

export default nextConfig
