/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // "node:" プレフィックスを通常のモジュール名に変換する
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
          resource.request = resource.request.replace(/^node:/, "");
        })
      );

      // ブラウザでは不要なNode.js標準モジュールを無効化する
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        fs: false,
        path: false,
        os: false,
        url: false,
        stream: false,
        buffer: false,
      };
    }
    return config;
  },
};

export default nextConfig;