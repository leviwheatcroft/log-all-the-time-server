const { ApolloError } = require('./ApolloError')

class AuthBadPasswordError extends ApolloError {
  constructor (options) {
    super({
      name: 'AuthBadPasswordError',
      message: 'Bad password',
      ...options
    })
  }
}

module.exports = {
  AuthBadPasswordError
}
