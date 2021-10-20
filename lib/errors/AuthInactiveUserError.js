const { ApolloError } = require('apollo-server-express')

class AuthInactiveUserError extends ApolloError {
  constructor (message = 'Auth Inactive User', extensions) {
    super(message, 'AUTH_INACTIVE_USER', extensions)
  }
}

module.exports = {
  AuthInactiveUserError
}
