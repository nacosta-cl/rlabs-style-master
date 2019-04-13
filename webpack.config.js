const env = require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

console.log(process.env)
const developmentMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

function in_path(entry) {
  return [entry];
}

module.exports = {
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ],
    minimizer: [new UglifyJsPlugin()],
  },
  plugins: [
    
  ],
  mode: process.env.NODE_ENV,
  context: path.join(__dirname, 'src', 'assets'),
  entry: {
    app: in_path('./js/app.jsx'),
  },
  output: {
    publicPath: '/assets/',
    path: path.join(__dirname, 'build', 'assets'),
    filename: '[name].js',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
  },
  devtool: developmentMode ? 'eval' : 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|json|gif|svg|woff|woff2|ttf|eot|ico|mtl|obj|patt)(\?v=.+)?$/,
        loader: 'file-loader?name=assets/[name].[ext]',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        { from: 'fonts', to: 'fonts/[name].[ext]' },
        { from: 'images', to: 'img/[name].[ext]' },
        { from: 'extras', to: '[name].[ext]'},
        { from: 'vendor', to: 'vendor/[name].[ext]'},
      ],
    ),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.ProvidePlugin({
      $ : 'jquery',
      jQuery : 'jquery',
      'window.jQuery' : 'jquery',
      Alert : 'exports-loader?Alert!bootstrap/js/dist/alert',
      Button : 'exports-loader?Button!bootstrap/js/dist/button',
      Carousel : 'exports-loader?Carousel!bootstrap/js/dist/carousel',
      Collapse : 'exports-loader?Collapse!bootstrap/js/dist/collapse',
      Dropdown : 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
      Modal : 'exports-loader?Modal!bootstrap/js/dist/modal',
      Popover : 'exports-loader?Popover!bootstrap/js/dist/popover',
      Scrollspy : 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
      Tab : 'exports-loader?Tab!bootstrap/js/dist/tab',
      Tooltip : "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util : 'exports-loader?Util!bootstrap/js/dist/util'
    })
  ],
};

