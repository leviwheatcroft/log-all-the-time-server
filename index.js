require('dotenv-flow').config()
const {
  info
} = require('./lib/log')
const {
  apolloListen
} = require('./apollo')
const {
  mongooseConnect
} = require('./db')

Promise.all([apolloListen(), mongooseConnect()]).then(([{ url }]) => {
  if (process.env.NODE_ENV !== 'production')
    info(`🚀  GraphQL ready at ${url}`)
  else
    info('🚀  GraphQL server listening')
})
