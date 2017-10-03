import cssNanoConfigs from './cssNanoConfigs.json'

const LAUNCH_COMMAND = process.env.npm_lifecycle_event
const isProd         = LAUNCH_COMMAND === 'production'

const prodStyleConfig = {
  fallback: 'style-loader',
  use : [
    {
      loader  : 'css-loader',
      options : {
        importLoaders  : 1,
        modules        : true,
        import         : true,
        minimize       : cssNanoConfigs,
        sourceMap      : !isProd,
        camelCase      : true,
        localIdentName : '[path][name]---[local]---[hash : base64 : 5]'
      }
    },
    {
      loader : 'postcss-loader'
    }
  ]
}

export default prodStyleConfig
