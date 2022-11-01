const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')

module.exports = {
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      inject: "body",
      template: "./dist/index.html"
    })
  ],
  entry: path.join(__dirname, "/dist/index.js"),
  devServer: {
    host: '0.0.0.0',
    open: false,
    port: 4001,
  }
}
