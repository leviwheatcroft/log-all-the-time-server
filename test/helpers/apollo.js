const {
  createTestClient
} = require('apollo-server-testing')
const {
  ApolloServer
} = require('apollo-server-micro')

// const tml = require('./tml')
const {
  typeDefs,
  resolvers,
  formatError: _formatError
} = require('../../apollo')

let _context = {}

function setApolloContext (ctx) {
  _context = {
    ..._context,
    ...ctx
  }
}

function context () {
  return _context
}

function formatError (error) {
  return _formatError(error, _context.squelchErrors)
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  formatError
})

const { query, mutate } = createTestClient(server)

module.exports = {
  query,
  mutate,
  setApolloContext
}
