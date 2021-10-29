const { ApolloError } = require('./ApolloError')

class AuthUnauthorizedError extends ApolloError {
  constructor (options) {
    super({
      name: 'AuthUnauthorizedError',
      message: 'Unauthorized to perform action',
      ...options
    })
  }
}

module.exports = {
  AuthUnauthorizedError
}
