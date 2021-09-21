const { ApolloError } = require('apollo-server')

class AuthRefreshTimeoutError extends ApolloError {
  constructor (message = 'refreshToken has expired', extensions) {
    super(message, 'AUTH_REFRESH_TIMEOUT', extensions)
  }
}

module.exports = {
  AuthRefreshTimeoutError
}
