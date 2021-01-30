/* eslint-disable global-require */
const {
  combineResolvers
} = require('apollo-resolvers')

const MutationMap = combineResolvers([
  require('./UserLoginM'),
  require('./UserRegisterM')
])

module.exports = {
  MutationMap
}
