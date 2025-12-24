import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  async redirects() {
    return [
      // 🔴 Force non-www → www (THIS FIXES YOUR ISSUE)
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "vaanra.com",
          },
        ],
        destination: "https://www.vaanra.com/:path*",
        permanent: true, // 301 redirect (SEO safe)
      },

    ];
  },
};

export default nextConfig;
