const { ApolloError } = require('apollo-server-express')

class AuthAccessTimeoutError extends ApolloError {
  constructor (message = 'Access token timed out.', extensions) {
    super(message, 'AUTH_ACCESS_TIMEOUT', extensions)
  }
}

module.exports = {
  AuthAccessTimeoutError
}
