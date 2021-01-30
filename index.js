require('dotenv-flow').config()
const { ApolloServer } = require('apollo-server')
const {
  connect: dbConnect
} = require('./db')
const {
  resolvers,
  typeDefs
} = require('./gql')

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers })

Promise.all([server.listen(), dbConnect()]).then(([{ url }]) => {
  console.info(`🚀  Server ready at ${url}`)
})
