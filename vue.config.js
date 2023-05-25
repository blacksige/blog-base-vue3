// const path = require('path')

module.exports = {
  publicPath: "./",
  // chainWebpack: (config: any) => {
  //   config.resolve.extensions.add("ts").add("tsx");
  // },
  devServer: {
    port: 9000,
    proxy: {
      "/study": {
        target: "http://10.100.9.167:9999",
        pathRerwrite: { "^/study": "/" },
      },
      // '/*': {
      //   target: 'http://10.100.1.52:8000',
      //   changeOrigin: true// 允许websockets跨域
      //   // ws: true,
      // }
    }, // 代理转发配置，用于调试环境
  },
};
