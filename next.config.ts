import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {}, // 👈 핵심: “turbopack을 의도적으로 사용 중” 표시
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
