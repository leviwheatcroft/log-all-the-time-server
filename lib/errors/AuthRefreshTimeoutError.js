const { ApolloError } = require('./ApolloError')

class AuthRefreshTimeoutError extends ApolloError {
  constructor (options) {
    super({
      name: 'AuthRefreshTimeoutError',
      message: 'Refresh token has expired',
      ...options
    })
  }
}

module.exports = {
  AuthRefreshTimeoutError
}
