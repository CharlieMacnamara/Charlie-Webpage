const withMDX = require('@next/mdx')()
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: 'export',
  pageExtensions: ['js', 'jsx', 'mdx'],
  images: {
    domains: ['localhost', 'charliemacnamara.uk', 'charliewebsite.s3.eu-west-2.amazonaws.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    unoptimized: true,
  },
  webpack: (config) => {
    // Optimize bundle size
    config.optimization = {
      ...config.optimization,
      minimize: true,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 70000,
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      },
    }

    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    }

    return config
  },
  compiler: {
    removeConsole: {
      exclude: ['error', 'warn'],
    },
  },
  // Optimize for production
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
}

module.exports = withBundleAnalyzer(withMDX(nextConfig))