const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/user/:path*",
        destination: "http://localhost:8888/user/:path*",
      },
      {
        source: "/user/logout",
        destination: "http://localhost:8888/user/logout",
      },
    ];
  },
};
module.exports = nextConfig;
