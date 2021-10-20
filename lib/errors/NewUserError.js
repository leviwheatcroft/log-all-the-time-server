const { ApolloError } = require('apollo-server-express')

class NewUserError extends ApolloError {
  constructor (message = 'New User Error', extensions) {
    super(message, 'NEW_USER_ERROR', extensions)
  }
}

module.exports = {
  NewUserError
}
