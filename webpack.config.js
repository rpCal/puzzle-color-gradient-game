const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: "development",
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'public/build')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
};