const { ApolloError } = require('./ApolloError')

class MidnightUtcError extends ApolloError {
  constructor (options) {
    super({
      name: 'MidnightUtcError',
      message: 'Midnight UTC Error',
      ...options
    })
  }
}

module.exports = {
  MidnightUtcError
}
