/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/board",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
