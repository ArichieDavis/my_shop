const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        views: "@/views",
        components: "@/components",
        network: "@/network",
        common: "@/common",
        assets: "@/assets",
      },
    },
    plugins: [new BundleAnalyzerPlugin()],
  },
}
