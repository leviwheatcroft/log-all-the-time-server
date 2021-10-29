const { ApolloError } = require('apollo-errors')

class _ApolloError extends ApolloError {
  constructor (options) {
    super(options.name, options)
  }
}

module.exports = { ApolloError: _ApolloError }
