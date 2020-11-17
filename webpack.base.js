const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const fs = require('fs');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets',
};

const PAGES_DIR = PATHS.src;
const PAGES = fs.readdirSync(PAGES_DIR).filter((fileName) => fileName.endsWith('.html'));

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: [PATHS.src + '/index.js'],
  output: {
    path: PATHS.dist,
    filename: `js/[name].js`,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${PATHS.src}/img`,
          to: 'img',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),
    // new HtmlWebpackPlugin({
    //   template: `${PATHS.src}/index.html`,
    //   filename: 'index.html',
    // }),
    ...PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page}`,
        })
    ),
  ],
};
