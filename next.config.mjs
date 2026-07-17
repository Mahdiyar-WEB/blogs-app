/** @type {import('next').NextConfig} */

let storageHostname;

try {
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_BASE_URL;
  storageHostname = storageUrl ? new URL(storageUrl).hostname : undefined;
} catch {
  storageHostname = undefined;
}

const nextConfig = {
  cacheComponents: true,
  experimental: {
    hideLogsAfterAbort: true,
  },
  reactCompiler: true,
  images: {
    remotePatterns: storageHostname
      ? [
          {
            protocol: "https",
            hostname: storageHostname,
          },
        ]
      : [],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
