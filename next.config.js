/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/dolce-laguna' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/dolce-laguna/' : '',
}

module.exports = nextConfig 