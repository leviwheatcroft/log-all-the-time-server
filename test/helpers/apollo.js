const {
  createTestClient
} = require('apollo-server-testing')
const {
  ApolloServer
} = require('apollo-server-micro')

const tml = require('./tml')
const {
  typeDefs,
  resolvers
} = require('../../apollo')

let _context = {}

function setApolloContext (ctx) {
  _context = ctx
}

function context () {
  return _context
}

function formatError (error) {
  if (_context.squelchErrors)
    return error
  tml.line()
  tml.bl(`Error Code: ${error.extensions.code}`)
  tml.wh(`Path: ${error.path}`)
  tml.wh('extensions.data:')
  console.info(error.extensions.data)
  return error
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
