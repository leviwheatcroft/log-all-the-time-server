const { ApolloServer } = require('apollo-server')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { applyMiddleware } = require('graphql-middleware')
const { resolvers } = require('./resolvers')
const { typeDefs } = require('./typeDefs')
const { middlewares } = require('./middlewares')
const tml = require('../lib/tml')

let instance

// quiet is used when running tests. not used by apollo server
function formatError (error, quiet) {
  const {
    message,
    path,
    extensions: {
      code,
      data,
      exposedData,
      exception
    }
  } = error

  if (!quiet) {
    tml.line()
    tml.bl(`Error Code: ${code}`)
    if (path)
      tml.wh(`Path: ${path}`)

    if (code === 'INTERNAL_SERVER_ERROR')
      tml.wh(`Message: ${error.message}`)

    if (code === 'GRAPHQL_VALIDATION_FAILED')
      tml.wh(`Message: ${error.message}`)

    if (data) {
      tml.wh('extensions.data:')
      console.info(data)
    }
    if (exposedData) {
      tml.wh('extensions.exposedData:')
      console.info(exposedData)
    }
    if (exception && exception.stacktrace) {
      tml.wh('extensions.exception.stacktrace')
      console.info(error.extensions.exception.stacktrace)
    }
  }

  return {
    message,
    code,
    exposedData
  }
}

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
