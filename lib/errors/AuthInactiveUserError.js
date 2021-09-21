const { ApolloError } = require('apollo-server')

class AuthInactiveUserError extends ApolloError {
  constructor (message = 'Auth Inactive User', extensions) {
    super(message, 'AUTH_INACTIVE_USER', extensions)
  }
}

module.exports = {
  AuthInactiveUserError
}
