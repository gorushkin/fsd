const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets',
};

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: [PATHS.src + '/index.js'],
  output: {
    path: PATHS.dist,
    // filename: '[name].bundle.js',
    // filename: `${PATHS.assets}/js/[name].js`,
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
    new HtmlWebpackPlugin({
      template: 'src/index.html', // template file
      filename: 'index.html', // output file
    }),
  ],
};
