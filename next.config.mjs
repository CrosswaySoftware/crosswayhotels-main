import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/author/crossway", destination: "/", permanent: false },
      {
        source: "/:locale/experiences/family/:slug*",
        destination: "/:locale/experiences/accommodations/:slug*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:locale/contact-us",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-cache, no-store, must-revalidate",
          },
          {
            key: "Vary",
            value:
              "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Accept, Accept-Encoding",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
