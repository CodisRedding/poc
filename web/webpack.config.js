module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public/js'
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.js']
  },

  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'source-map-loader' }
    ]
  }
};