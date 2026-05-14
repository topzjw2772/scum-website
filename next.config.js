/** @type {import('next').NextConfig} */
const nextConfig = {
  // ISR 配置
  experimental: {
    // ISR 稳定性配置
  },

  // 图片优化
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.feishu.cn',
      },
      {
        protocol: 'https',
        hostname: 'internal-api-drive-stream.feishu.cn',
      },
    ],
  },

  // 环境变量
  env: {
    FEISHU_APP_ID: process.env.FEISHU_APP_ID,
    FEISHU_APP_SECRET: process.env.FEISHU_APP_SECRET,
    FEISHU_RULES_DOC_TOKEN: process.env.FEISHU_RULES_DOC_TOKEN,
  },
};

module.exports = nextConfig;
