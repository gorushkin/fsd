const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

function NothingPlugin() {
  this.apply = function () {};
}

const config = ({ NODE_ENV } = { NODE_ENV: 'development' }) => {
  console.log('NODE_ENV: ', NODE_ENV);

  const isProd = NODE_ENV === 'production';
  console.log('isProd: ', isProd);

  return {
    entry: './src/index.js',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    mode: isProd ? 'production' : 'development',
    devServer: {
      overlay: true,
      port: 5000,
      contentBase: './dist',
    },
    devtool: isProd ? 'source-map' : 'source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(css|scss)$/,
          use: [
            // isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            // MiniCssExtractPlugin.loader,
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: 'public/index.html',
      }),
      isProd ? new MiniCssExtractPlugin({ filename: '[name].css' }) : new NothingPlugin(),
    ],
  };
};

module.exports = (env) => config(env);
