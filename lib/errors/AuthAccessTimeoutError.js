const { ApolloError } = require('./ApolloError')

class AuthAccessTimeoutError extends ApolloError {
  constructor (options) {
    super({
      name: 'AuthAccessTimeoutError',
      message: 'Authorisation access token timed out',
      ...options
    })
  }
}

module.exports = {
  AuthAccessTimeoutError
}
