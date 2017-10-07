/*
 *
 * 8888888b.  8888888b.        .d8888b.                     .d888 d8b
 * 888   Y88b 888   Y88b      d88P  Y88b                   d88P"  Y8P
 * 888    888 888    888      888    888                   888
 * 888   d88P 888   d88P      888         .d88b.  88888b.  888888 888  .d88b.
 * 8888888P"  8888888P"       888        d88""88b 888 "88b 888    888 d88P"88b
 * 888        888             888    888 888  888 888  888 888    888 888  888
 * 888        888             Y88b  d88P Y88..88P 888  888 888    888 Y88b 888
 * 888        888              "Y8888P"   "Y88P"  888  888 888    888  "Y88888
 *                                                                         888
 *                                                                    Y8b d88P
 *                                                                     "Y88P"
*/

import webpack           from 'webpack'
import path              from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import chalk             from 'chalk'
import StyleLintPlugin   from 'stylelint-webpack-plugin'

import { devStyleConfig, prodStyleConfig } from './build-configs'

const LAUNCH_COMMAND = process.env.npm_lifecycle_event
const isProd         = LAUNCH_COMMAND === 'production'
const PATHS          = {
  app          : path.join(__dirname, 'app'),
  build        : path.join(__dirname, 'build'),
  config       : path.join(__dirname, 'app/config'),
  redux        : path.join(__dirname, 'app/redux'),
  utils        : path.join(__dirname, 'app/utils'),
  styles       : path.join(__dirname, 'app/styles'),
  containers   : path.join(__dirname, 'app/containers'),
  components   : path.join(__dirname, 'app/components'),
  transformers : path.join(__dirname, 'app/transformers')
}

// Plugins Configuration Starts
const moduleConcatenationPlugin = new webpack.optimize.ModuleConcatenationPlugin()
const extractTextPluginConfig = new ExtractTextPlugin({
  allChunks : false,
  filename  : '[name]_[contenthash].css'
})
const HtmlWebpackPluginConfig   = new HtmlWebpackPlugin({
  template : `${PATHS.app}/index.html`,
  filename : 'index.html',
  inject   : 'body'
})
const commonsVendorChunk = new webpack.optimize.CommonsChunkPlugin({
  name      : 'vendor',
  minChunks : Infinity,
  filename  : 'vendor.commons.js'
})
const styleLintConfig = new StyleLintPlugin({
  failOnError : true,
  files       : '**/*.css',
  context     : './',
  failOnError : false,
  configFile  : 'stylelint.config.js'
})
const prodPlugin = new webpack.DefinePlugin({
  'process.env' : {
    NODE_ENV : JSON.stringify('production')
  }
})
// Plugins Configuration Ends

process.env.BABEL_ENV = LAUNCH_COMMAND
process.env.LINT_ENV  = LAUNCH_COMMAND
process.env.isProd    = isProd

console.log(chalk.green('---------------------------------------------------------------'))
console.log(chalk.green(`-------- Running Application In ${isProd ? 'Production' : 'Development'} Environment -------`))
console.log(chalk.green('---------------------------------------------------------------'))

const base = {
  entry  : ['babel-polyfill', PATHS.app, `${PATHS.styles}/main.css`],
  output : {
    path       : PATHS.build,
    filename   : 'bundle.js',
    publicPath : '/',
  },
  module : {
    rules : [
      {
        enforce : 'pre',
        test    : /\.(js|jsx)$/,
        use     : 'eslint-loader',
        include : PATHS.app,
        exclude : /bundle\.js/
      },
      {
        test    : /\.(js|jsx)$/,
        exclude : [/node_modules/],
        loader  : 'babel-loader'
      },
      {
				test : /\.json$/,
				loader: 'json'
			},
      {
        test    : /\.css$/,
        exclude : /node_modules/,
        use     : isProd ? ExtractTextPlugin.extract(prodStyleConfig) : devStyleConfig
      }
    ]
  },
  resolve : {
    alias : {
      $CONFIG       : PATHS.config,
      $APP          : PATHS.app,
      $REDUX        : PATHS.redux,
      $UTILS        : PATHS.utils,
      $COMPONENTS   : PATHS.components,
      $CONTAINERS   : PATHS.containers,
      $TRANSFORMERS : PATHS.transformers
    },
    enforceExtension : false,
    extensions       : ['.js', '.jsx', '.css'],
    modules          : [path.resolve('.'), 'node_modules']
  },
  context : PATHS.app
}

const commonPlugins = [HtmlWebpackPluginConfig, moduleConcatenationPlugin, commonsVendorChunk, styleLintConfig]
const devConfig = {
  devtool   : 'inline-source-map', // Stilll need to experiment around this, very slow
  devServer : {
    compress           : true,
    historyApiFallback : true,
    clientLogLevel     : 'info',
    open               : true,
    overlay            : {
      warnings : isProd,
      errors   : true
    }
  },
  plugins   : commonPlugins
}
const prodConf = {
  devtool : false,
  plugins : commonPlugins.concat([prodPlugin, extractTextPluginConfig])
}

devConfig.plugins = commonPlugins

export default Object.assign({}, base, isProd ? prodConf : devConfig)

