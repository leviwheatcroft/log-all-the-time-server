const { ApolloServer } = require('apollo-server')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { applyMiddleware } = require('graphql-middleware')
const { resolvers } = require('./resolvers')
const { typeDefs } = require('./typeDefs')
const { middlewares } = require('./middlewares')
const tml = require('../lib/tml')

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

  function formatError (error) {
    tml.line()
    tml.bl(`Error Code: ${error.extensions.code}`)
    tml.wh(`Path: ${error.path}`)

    if (error.extensions && error.extensions.data) {
      tml.wh('extensions.data:')
      console.info(error.extensions.data)
    }
    if (error.extensions && error.extensions.exception) {
      tml.wh('extensions.exception.stacktrace')
      console.info(error.extensions.exception.stacktrace)
    }

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
