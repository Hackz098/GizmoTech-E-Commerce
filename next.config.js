/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for deployment
  output: 'standalone',
  // Optimize images for production
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
