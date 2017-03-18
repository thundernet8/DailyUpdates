import path                           from 'path'
import webpack                        from 'webpack'
import baseConfig                     from './webpack.base.conf.babel'
import HtmlWebpackPlugin              from 'html-webpack-plugin'
import merge                          from 'webpack-merge'
import OptimizeCssAssetsPlugin        from 'optimize-css-assets-webpack-plugin'

baseConfig.entry = {}

let appProdConfig = {
  // whether to generate source map for production files.
  // disabling this can speed up the build.
  devtool: false, // '#source-map',

  entry: {
    app: [
        'babel-polyfill',
        './src/index.jsx'
    ]
  },

  output: {
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[id].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: './Client/dist/'
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader?presets[]=react&presets[]=es2015&presets[]=es2017&presets[]=stage-2',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.min\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    }),
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: '../../Views/Home/index.cshtml',
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      bodyClass: `platform_${process.platform}`
    })
  ]
}

export default merge(baseConfig, appProdConfig)
