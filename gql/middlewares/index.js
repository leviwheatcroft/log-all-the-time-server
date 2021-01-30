const { authenticationMap } = require('./authentication')
const { authorizationMap } = require('./authorization')
const { errorMap } = require('./error')

const middlewares = [
  errorMap,
  authenticationMap,
  authorizationMap
]

module.exports = {
  middlewares
}
