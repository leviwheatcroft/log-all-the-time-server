const { ApolloError } = require('apollo-server-express')

class AuthFailedError extends ApolloError {
  constructor (message = 'Auth Failed', extensions) {
    super(message, 'AUTH_FAILED', extensions)
  }
}

module.exports = {
  AuthFailedError
}
