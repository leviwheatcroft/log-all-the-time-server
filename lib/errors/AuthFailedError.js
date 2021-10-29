const { ApolloError } = require('./ApolloError')

class AuthFailedError extends ApolloError {
  constructor (options) {
    super({
      name: 'AuthFailedError',
      message: 'Authorisation failed',
      ...options
    })
  }
}

module.exports = {
  AuthFailedError
}
