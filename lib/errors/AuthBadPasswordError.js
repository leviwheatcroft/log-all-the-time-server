const { ApolloError } = require('apollo-server')

class AuthBadPasswordError extends ApolloError {
  constructor (message = 'Auth Bad Password', extensions) {
    super(message, 'AUTH_BAD_PASSWORD', extensions)
  }
}

module.exports = {
  AuthBadPasswordError
}
