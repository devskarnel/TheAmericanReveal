import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'api.dicebear.com' },
    ],
  },

  // Ensure Node.js built-ins used in lib/db.ts are not bundled
  serverExternalPackages: ['fs', 'path'],

  // Include the data directory in Vercel's output file tracing
  outputFileTracingIncludes: {
    '/**': ['./data/**'],
  },
}

export default nextConfig
