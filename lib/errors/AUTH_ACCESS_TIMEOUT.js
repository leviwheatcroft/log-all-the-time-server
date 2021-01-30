const { createError } = require('apollo-errors')

const AUTH_ACCESS_TIMEOUT = createError('AUTH_ACCESS_TIMEOUT', {
  message: 'auth failed - access token expired',
  options: {
    showPath: true,
    showLocation: true
  }
})

module.exports = {
  AUTH_ACCESS_TIMEOUT
}
