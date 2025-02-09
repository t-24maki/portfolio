/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true  // この行を追加
    },
    trailingSlash: true
  }
  
  module.exports = nextConfig