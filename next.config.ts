import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  // Playwright hits 127.0.0.1 rather than localhost; whitelist it so the
  // dev-server doesn't spam a cross-origin warning during E2E runs.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
