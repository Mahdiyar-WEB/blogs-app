/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents:true,
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [new URL("http://localhost:5000/uploads/**")],
    dangerouslyAllowLocalIP: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
