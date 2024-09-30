/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: 'incremental',
    // reactCompiler: true,
    // staleTimes: {
    //   dynamic: 30,
    // },
  },
};

module.exports = nextConfig;
