const { createError } = require('apollo-errors')

const AUTH_REFRESH_TIMEOUT = createError('AUTH_REFRESH_TIMEOUT', {
  message: 'auth failed - refresh token expired'
})

module.exports = {
  AUTH_REFRESH_TIMEOUT
}
