const { ApolloError } = require('./ApolloError')

class AuthBadEmailError extends ApolloError {
  constructor (options) {
    super({
      name: 'AuthBadEmailError',
      message: 'Bad email address',
      ...options
    })
  }
}

module.exports = {
  AuthBadEmailError
}
