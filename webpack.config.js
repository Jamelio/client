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
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
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
    path: path.resolve(__dirname, 'dist')
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
    proxy: {
      '/api': {
        target: 'http://192.168.0.24:3000',
        pathRewrite: {'^/api' : ''},
        secure:false,
        changeOrigin:true,
        logLevel: 'debug'
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }
    },
    historyApiFallback: true,
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
  devtool: "source-map",
}
