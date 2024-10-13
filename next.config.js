/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  redirects: async () => {
    return [
      {
        destination: '/todo',
        permanent: true,
        source: '/',
      },
    ];
  },
};

module.exports = nextConfig;
