//gzip
const terserPlugin = require("terser-webpack-plugin");

//proxy
module.exports = {
  configureWebpack(config) {
    // 生产环境去掉console, 注意console里面不要放函数调用, 也会被删掉
    if (process.env.NODE_ENV === "production") {
      const terserWebpackPlugin = config.optimization.minimizer[0];
      const terserOptions = terserWebpackPlugin.options.terserOptions;
      terserOptions.compress["drop_console"] = true;
    }
  },

  devServer: {
    proxy: {
      "/": {
        target: "http://demo.chassstep.com/",
        ws: false
      }
    }
  }
};
