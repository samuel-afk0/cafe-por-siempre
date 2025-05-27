import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"], // ✅ Aquí permites ese dominio
  },
};

export default nextConfig;
