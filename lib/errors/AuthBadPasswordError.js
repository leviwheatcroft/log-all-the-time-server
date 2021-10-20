const { ApolloError } = require('apollo-server-express')

class AuthBadPasswordError extends ApolloError {
  constructor (message = 'Auth Bad Password', extensions) {
    super(message, 'AUTH_BAD_PASSWORD', extensions)
  }
}

module.exports = {
  AuthBadPasswordError
}
