const withImages = require('next-images')

module.exports = withImages({
  esModule: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
})
