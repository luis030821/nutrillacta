/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  pwa: {
    dest: "public",
    register: true,
  },
});
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = () => {
  const plugins = [withPWA, withBundleAnalyzer];
  return plugins.reduce((acc, next) => next(acc), {
    transpilePackages: [
      "@llampukaq/realm",
      "@llampukaq/realm-google-provider",
      "@llampukaq/icons",
      "@llampukaq/realm-email-provider",
    ],

    env: {
      version: process.env.VERSION,
      name: process.env.NAME,
      celular: process.env.CELULAR,
    },
    output: "export",
    swcMinify: true,
    reactStrictMode: false,
    eslint: {
      ignoreDuringBuilds: true,
    },
  });
};
