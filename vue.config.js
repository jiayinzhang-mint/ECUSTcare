//gzip
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  assetsDir: "./static",
  configureWebpack: {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true, //console
              drop_debugger: false,
              pure_funcs: ["console.log"] //移除console
            }
          }
        }),
        new CompressionWebpackPlugin({
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8
        })
      ]
    }
  }
};

//proxy
module.exports = {
  devServer: {
    proxy: {
      "/": {
        target: "http://demo.chassstep.com/",
        ws: false
      }
    }
  }
};
