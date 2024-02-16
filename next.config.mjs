/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  basePath: "",
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
