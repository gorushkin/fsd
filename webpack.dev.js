const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');
const webpack = require('webpack');

module.exports = (env) => {
  console.log('env: ', env);

  return merge(base, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      contentBase: base.externals.paths.dist,
      historyApiFallback: true,
      compress: true,
      watchContentBase: true,
      // hot: true,
      port: 8080,
    },
    target: 'web',
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        },
      ],
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
  });
};
