/**
 * REFERENCE::::
 * https://linguinecode.com/post/how-to-setup-webpack-dev-server-react-babel
 */
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());

const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

const host = process.env.localhost || 'localhost';

// required for babel-preset-react-app
process.env.NODE_ENV = 'development';

module.exports = {
  mode: 'development',
  entry: resolveAppPath('src'),
  output: {
    filename: 'static/js/bundle.js'
  },

  devServer: {
    // serves index.html as the base
    // -- contentBase tells webpack what static file should it serve
    contentBase: resolveAppPath('public'),
    compress: true,
    hot: true,
    host,
    port: 3000,
    // publicPath is root of content base
    // -- publicPath defines what the browser will look when serving public assets
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: resolveAppPath('src'),
        loader: 'babel-loader',
        options: {
          presets: [
            require.resolve('babel-preset-react-app')
          ]
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveAppPath('public/index.html')
    })
  ]
};