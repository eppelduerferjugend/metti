/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers () {
    return [
      {
        source: '/api(.*)',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json; charset=utf-8'
          },
          // The following example instructs the Edge Network to cache the
          // response for 5 seconds.
          {
            key: 'Cache-Control',
            value: 's-maxage=5'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
