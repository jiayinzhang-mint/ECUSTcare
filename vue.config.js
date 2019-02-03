//gzip
const compressionPlugin = require("compression-webpack-plugin");
module.exports = {
  assetsDir: "./static",
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      return {
        plugins: [
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
        target: "http://ghhd.ecnu.edu.cn/",
        ws: false
      }
    }
  }
};