const { authenticationMap } = require('./authentication')
const { authorizationMap } = require('./authorization')
const { loggerMap } = require('./logger')
const { errorMap } = require('./error')
const { userMap } = require('./user')

const middlewares = [
  errorMap,
  authenticationMap,
  authorizationMap,
  userMap,
  loggerMap
]

module.exports = {
  middlewares
}
