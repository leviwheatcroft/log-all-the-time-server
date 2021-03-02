const { ApolloServer } = require('apollo-server')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { applyMiddleware } = require('graphql-middleware')
const { resolvers } = require('./resolvers')
const { typeDefs } = require('./typeDefs')
const { middlewares } = require('./middlewares')

let instance

/**
 * ## listen
 * this fn is unusual in that it's not declared as an `async` function, but
 * it still returns a promise, therefore it can be called with `await lsiten()`
 */
function apolloListen (options = {}) {
  const {
    includeMiddlewares = false
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

  function formatError (error) {
    console.log(error)
    if (error.extensions.code === 'AUTH_ACCESS_TIMEOUT')
      return error
    if (error.extensions && error.extensions.exception)
      console.log(error.extensions.exception.stacktrace)
    return error
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
  resolvers,
  typeDefs,
  middlewares,
  apolloListen
}
