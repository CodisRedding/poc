const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
  publicPath: 'dist/'
});
const cssConfig = isProd ? cssProd : cssDev;
const bootstratConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
  entry: {
    app: './src/index.js',
    bootstrap: bootstratConfig
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    open: true,
    stats: 'errors-only'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: cssConfig
      },
      {
        test: /\.png$/,
        use: [
          'file-loader?name=[name].[ext]?[hash]&publicPath=./&outputPath=images/',
          'image-webpack-loader'
        ]
      },
      { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000?name=[name].[ext]&publicPath=./&outputPath=fonts/' },
      { test: /\.(ttf|eot)$/, loader: 'file-loader?name=[name].[ext]&publicPath=./&outputPath=fonts/' },
      { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Web app',
      // minify: {
      //   collapseWhitespace: true
      // },
      hash: true,
      template: './src/index.html'
    }),
    new ExtractTextPlugin({
      filename: '/css/[name].css',
      disable: !isProd,
      allChunks: true
    }),
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, 'src/*.html')),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()]
};