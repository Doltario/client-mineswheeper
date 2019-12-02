const path = require('path')
module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set(
      '@components',
      path.resolve(__dirname, 'src', 'components')
    )
    config.resolve.alias.set(
      '@services',
      path.resolve(__dirname, 'src', 'services')
    )
  }
}
