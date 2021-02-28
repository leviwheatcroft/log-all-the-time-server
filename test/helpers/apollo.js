const {
  createTestClient
} = require('apollo-server-testing')
const {
  ApolloServer
} = require('apollo-server-micro')

const {
  typeDefs,
  resolvers
} = require('../../gql')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context () { return {} }
})

const { query, mutate } = createTestClient(server)

module.exports = {
  query,
  mutate
}
