require('dotenv-flow').config()
const express = require('express')
const {
  info
} = require('./lib/log')
const {
  apolloListen
} = require('./apollo')
const {
  dbInitialised
} = require('./db')

// Promise.all([apolloListen(), dbInitialised]).then(([{ url }]) => {
//   if (process.env.NODE_ENV !== 'production')
//     info(`🚀  GraphQL ready at ${url}`)
//   else
//     info('🚀  GraphQL server listening')
// })

async function startServer () {
  const app = express()

  app.use(express.static(process.env.CLIENT_PATH))

  const server = await apolloListen()

  server.applyMiddleware({ app })
  await Promise.all([
    new Promise((resolve) => app.listen({ port: 4000 }, resolve)),
    dbInitialised
  ])
  // info(`🚀  GraphQL ready at ${url}${server.graphqlPath}`)
  info(`🚀  GraphQL ready at http::/localhost:4000${server.graphqlPath}`)
}

startServer()
