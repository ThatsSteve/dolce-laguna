/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Importante per l'hosting statico
  },
  reactStrictMode: false, // Disabilito per evitare doppi rendering in sviluppo
  poweredByHeader: false,
  compress: true,
  output: 'export', // Esporta come sito statico
  trailingSlash: true, // Aggiunge slash finali alle URL per compatibilità hosting
  basePath: isProd ? '/dolce-laguna' : '',
  assetPrefix: isProd ? '/dolce-laguna/' : '',
  experimental: {
    // optimizeCss: true, // Disabilitato temporaneamente
    scrollRestoration: true, // Migliora il comportamento di scorrimento durante la navigazione
  }
}

export default nextConfig