require('dotenv-flow').config()
const {
  apolloListen
} = require('./apollo')
const {
  mongooseConnect
} = require('./db')

Promise.all([apolloListen(), mongooseConnect()]).then(([{ url }]) => {
  console.info(`🚀  Server ready at ${url}`)
})
