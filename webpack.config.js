const path = require('path');
const webpack = require('webpack')
const dotenv = require('dotenv')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require("fs");

dotenv.config();

module.exports = {
  mode: 'none',
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx')
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      }
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../peer-server/client')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html')
    })
  ],
  devServer: {
    https: {
      key: fs.readFileSync('./certs/jamelio.local+2-key.pem'),
      cert: fs.readFileSync('./certs/jamelio.local+2.pem'),
    },
    allowedHosts: 'all',
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 443,
  },
}