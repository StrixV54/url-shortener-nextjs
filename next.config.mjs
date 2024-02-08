/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
