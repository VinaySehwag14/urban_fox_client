import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/jugaducollection",
        destination: "https://www.jugaaducollection.com",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
