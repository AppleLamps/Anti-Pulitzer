import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  experimental: {
    serverActions: {
      // Match upload cap: up to 5 attachments at 10 MB each, plus form fields.
      bodySizeLimit: "52mb",
    },
  },
};

export default nextConfig;
