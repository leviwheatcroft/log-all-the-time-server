/* eslint-disable global-require */
const {
  combineResolvers
} = require('apollo-resolvers')

const MutationMap = combineResolvers([
  require('./UserLoginM'),
  require('./UserRegisterM'),
  require('./UserRefreshM'),
  require('./EntryUpdateM'),
  require('./EntryAddM'),
  require('./EntryUpsertM'),
  require('./EntryDeleteM')
])

module.exports = {
  MutationMap
}
