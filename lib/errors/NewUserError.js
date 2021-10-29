const { ApolloError } = require('./ApolloError')

class NewUserError extends ApolloError {
  constructor (options) {
    super({
      name: 'NewUserError',
      message: 'New User Error',
      ...options
    })
  }
}

module.exports = {
  NewUserError
}
