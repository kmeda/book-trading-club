var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');



var envFile = require('node-env-file');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try {
  envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));
} catch (e) {
}

console.log("Current environment - "+process.env.NODE_ENV);

const VENDOR_LIBS = [
  'react', 'redux', 'react-redux', 'react-dom',
  'redux-form', 'redux-thunk', 'react-router-dom'
];

module.exports = {
  entry: {
    bundle: './src/app.jsx',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: ['es2015', 'react', 'stage-0'],
            env: {
              development: {
                presets: ['react-hmre']
              }
            }
        }
      },
      {
        test: /\.(scss|sass)$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader','sass-loader']
        })),
      },
      {
      test: /\.(jpe?g|png|gif|svg)$/,
      use: [
        { loader: 'url-loader',
          options: {limit: 40000}},
        'image-webpack-loader']
      },
      {
       test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
       use: 'url-loader?limit=10000&mimetype=application/font-woff'
     },
     {
       test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
       use: 'url-loader?limit=10000&mimetype=application/octet-stream'
     },
     {
       test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
       use: 'file-loader'
     },
     {
       test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
       use: 'url-loader?limit=10000&mimetype=image/svg+xml'
     }
    ]
  },
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true
  },
  watchOptions: {
  ignored: /node_modules/
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new ExtractTextPlugin({
    filename: 'styles.css',
    allChunks: true
  }),
    new webpack.ProvidePlugin({
     $: "jquery",
     jQuery: "jquery"
   }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};
