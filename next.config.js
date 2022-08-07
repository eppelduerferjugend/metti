/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  api: {
    headers: [
      // The following example instructs the Edge Network to cache the response
      // for 5 seconds.
      {
        key: 'Cache-Control',
        value: 's-maxage=5'
      }
    ]
  }
}

module.exports = nextConfig
