require('dotenv-flow').config()
const {
  apolloListen
} = require('./apollo')
const {
  mongooseConnect
} = require('./db')

Promise.all([apolloListen(), mongooseConnect()]).then(([{ url }]) => {
  if (process.env.NODE_ENV !== 'production')
    console.info(`🚀  GraphQL ready at ${url}`)
  else
    console.info('🚀  GraphQL server listening')
})
