/** @type {import('next').NextConfig} */
const nextConfig = {
  serverActions: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
