const { resolvers } = require('./resolvers')
const { typeDefs } = require('./typeDefs')
// see envoy, I think this needs to be done with middlewares

module.exports = {
  resolvers,
  typeDefs
}
