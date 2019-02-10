//gzip
const compressionPlugin = require("compression-webpack-plugin");
const uglifyPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  assetsDir: "./static",
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      return {
        plugins: [
          new uglifyPlugin({
            uglifyOptions: {
              compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
              }
            },
            sourceMap: false,
            parallel: true
          }),
          new compressionPlugin({
            test: /\.js$|\.html$|\.css/,
            threshold: 10240,
            deleteOriginalAssets: false
          })
        ]
      };
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
