const { ApolloError } = require('apollo-server')

class AuthBadEmailError extends ApolloError {
  constructor (message = 'Auth Bad Email', extensions) {
    super(message, 'AUTH_BAD_EMAIL', extensions)
  }
}

module.exports = {
  AuthBadEmailError
}
