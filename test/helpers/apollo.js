const {
  createTestClient
} = require('apollo-server-testing')
const {
  ApolloServer
} = require('apollo-server-micro')

const {
  typeDefs,
  resolvers
} = require('../../apollo')

let context

function setContext (ctx) {
  context = ctx
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context () { return context }
})

const { query, mutate } = createTestClient(server)

module.exports = {
  query,
  mutate,
  setContext
}
