const webpack = require("webpack");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  devtool: "cheap-module-eval-source-map",
  entry: {
    "malay": "./JS/malay.js",
    "awani.article-details": "./JS/articleDetails.js"
  },
  output: {
    path: __dirname,
    filename: "build/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            query: {
              presets: ["es2015", "react"]
            }
          }
        ]
      }
    ]
  },
  mode: "production",
  node: {
    dns: "mock",
    net: "mock"
  },
  watchOptions: {
    ignored: ["build", "node_modules"]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i
      })
    ]
  }
};
