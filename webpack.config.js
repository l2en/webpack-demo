const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    home: './src/home.js',
    other: './src/other.js'
  },
  output: {
    filename: '[name]/[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ "style-loader/url",
        {
          loader: "file-loader",
          options: {
            publicPath: './'
          }
        }]
      }
    ]
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/home.html',
      filename: 'home/index.html',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      template: './src/other.html',
      filename: 'other/index.html',
      chunks: ['other']
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'src/'),
    compress: true,
    port: 9000,
    hot: true,
    open: false,
    progress: true
  }
}