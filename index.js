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

const server = new ApolloServer({ schema })

Promise.all([server.listen(), dbConnect()]).then(([{ url }]) => {
  console.info(`🚀  Server ready at ${url}`)
})
