import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Three.js/React Three Fiber packages to be transpiled
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
