const { ApolloServer } = require('apollo-server')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { applyMiddleware } = require('graphql-middleware')
const { resolvers } = require('./resolvers')
const { typeDefs } = require('./typeDefs')
const { middlewares } = require('./middlewares')
const { formatError } = require('./formatError')

let instance

/**
 * ## listen
 * this fn is unusual in that it's not declared as an `async` function, but
 * it still returns a promise, therefore it can be called with `await lsiten()`
 */
function apolloListen (options = {}) {
  const {
    includeMiddlewares = true
  } = options
  if (instance)
    return instance

  const schema = applyMiddleware(
    makeExecutableSchema({ typeDefs, resolvers }),
    ...includeMiddlewares ? middlewares : []
  )

  function context ({ req }) {
    return { req }
  }

  const server = new ApolloServer({ schema, context, formatError })

  instance = server.listen().then(({ url }) => {
    return {
      url,
      server
    }
  })
  return instance
}

module.exports = {
  formatError,
  resolvers,
  typeDefs,
  middlewares,
  apolloListen
}
