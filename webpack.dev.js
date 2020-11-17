const { merge } = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base.js');

module.exports = (env) => {
  console.log('env: ', env);

  return merge(base, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      contentBase: base.externals.paths.dist,
      historyApiFallback: true,
      compress: true,
      hot: true,
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
