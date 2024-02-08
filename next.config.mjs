/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: "/login",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        basePath: false,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
