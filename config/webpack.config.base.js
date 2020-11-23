const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.NODE_ENV;
const isProdMode = env === 'production';

module.exports = {
  mode: env,
  context: path.resolve(__dirname, '..'),
  entry: { 
    app: './src/index.js' 
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: !isProdMode ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
    chunkFilename: !isProdMode ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.mjs', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  optimization: { minimizer: []},
};