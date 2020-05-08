const path = require('path')
module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('@components', path.resolve(__dirname, 'src', 'components'))
    config.resolve.alias.set('@services', path.resolve(__dirname, 'src', 'services'))
    config.resolve.alias.set('@utils', path.resolve(__dirname, 'src', 'utils'))
    config.resolve.alias.set('@store', path.resolve(__dirname, 'src', 'store'))
    config.resolve.alias.set('@styles', path.resolve(__dirname, 'src', 'styles'))
    config.resolve.alias.set('@assets', path.resolve(__dirname, 'src', 'assets'))
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@styles/_vars.scss";
          @import "@styles/_mixins.scss";
        `
      }
    }
  }
}
