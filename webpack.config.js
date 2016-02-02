const path = require('path');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
  plugins: [
    new NpmInstallPlugin(),
  ],
};
