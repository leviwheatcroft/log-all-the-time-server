const { ApolloError } = require('./ApolloError')

class AuthInactiveUserError extends ApolloError {
  constructor (options) {
    super({
      name: 'AuthInactiveUserError',
      message: 'Inactive user',
      ...options
    })
  }
}

module.exports = {
  AuthInactiveUserError
}
