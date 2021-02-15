const { authenticationMap } = require('./authentication')
const { authorizationMap } = require('./authorization')
const { loggerMap } = require('./logger')
// const { errorMap } = require('./error')

const middlewares = [
  // errorMap,
  authenticationMap,
  authorizationMap,
  loggerMap
]

module.exports = {
  middlewares
}
