import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "techcrunch.com",
      },
    ],
  },
  async rewrites() {
    return [
      // Rewrite root to default locale
      {
        source: "/",
        destination: "/en",
      },
      // Rewrite non-locale paths to default locale
      {
        source: "/:path((?!en|it).*)*",
        destination: "/en/:path*",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
