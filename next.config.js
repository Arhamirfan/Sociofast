/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/authentication/login',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;