/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.cache.buildDependencies.mydeps = ['./yarn.lock'];
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      dns: false,
      net: false,
      tls: false,
      'pg-native': false,
      encoding: false,
      bufferutil: false,
      'utf-8-validate': false
    };
    return config;
  }
}

module.exports = nextConfig
