require('dotenv-flow').config()
const {
  info
} = require('./lib/log')
const {
  apolloListen
} = require('./apollo')
const {
  dbInitialised
} = require('./db')

Promise.all([apolloListen(), dbInitialised]).then(([{ url }]) => {
  if (process.env.NODE_ENV !== 'production')
    info(`🚀  GraphQL ready at ${url}`)
  else
    info('🚀  GraphQL server listening')
})

// dbInitialised.then(() => {
//   info('🚀 db ready')
// })
