/* eslint-disable global-require */
const {
  combineResolvers
} = require('apollo-resolvers')

const MutationMap = combineResolvers([
  // require('./UserLoginM'),
  require('./UserRegisterM'),
  // require('./UserRefreshM'),
  require('./EntryCreateM'),
  // require('./EntryDeleteM')
])

module.exports = {
  MutationMap
}
