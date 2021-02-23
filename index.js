require('dotenv-flow').config()
const { ApolloServer } = require('apollo-server')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { applyMiddleware } = require('graphql-middleware')
const {
  connect: dbConnect
} = require('./db')
const {
  resolvers,
  typeDefs,
  middlewares
} = require('./gql')

const schema = applyMiddleware(
  makeExecutableSchema({ typeDefs, resolvers }),
  ...middlewares
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

Promise.all([server.listen(), dbConnect()]).then(([{ url }]) => {
  console.info(`🚀  Server ready at ${url}`)
})
