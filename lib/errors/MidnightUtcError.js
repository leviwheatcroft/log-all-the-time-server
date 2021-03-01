const { ApolloError } = require('apollo-server')

class MidnightUtcError extends ApolloError {
  constructor (message = 'Midnight Utc Error', extensions) {
    super(message, 'MIDNIGHT_UTC_ERROR', extensions)
  }
}

module.exports = {
  MidnightUtcError
}
