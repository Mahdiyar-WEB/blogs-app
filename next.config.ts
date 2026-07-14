import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    hideLogsAfterAbort: true,
  },
  /* config options here */
  reactCompiler: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
