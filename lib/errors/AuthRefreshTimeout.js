const { ApolloError } = require('apollo-server')

class AuthRefreshTimeout extends ApolloError {
  constructor (message = 'refreshToken has expired', extensions) {
    super(message, 'AUTH_REFRESH_TIMEOUT', extensions)
  }
}

module.exports = {
  AuthRefreshTimeout
}
