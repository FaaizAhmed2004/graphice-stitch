import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow external images if needed later
  images: {
    remotePatterns: [],
  },
  // Ensure nodemailer works server-side only
  serverExternalPackages: ["nodemailer"],
};

export default nextConfig;
