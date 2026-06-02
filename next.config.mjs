/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [new URL('http://localhost:5000/uploads/**')],
    dangerouslyAllowLocalIP: true
  },
};

export default nextConfig;
