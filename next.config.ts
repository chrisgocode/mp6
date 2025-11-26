import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // next.js complained about this. let's us show images from different sources
      },
    ],
  },
  typedRoutes: true,
};

export default nextConfig;
