import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        hostname:  "easydash.enago.com"
      }
    ] 
  }
};

export default nextConfig;
