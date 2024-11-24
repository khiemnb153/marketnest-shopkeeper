/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**', // Matches all hostnames for HTTP
      },
      {
        protocol: 'https',
        hostname: '**', // Matches all hostnames for HTTPS
      },
    ],
  },
}

export default nextConfig
