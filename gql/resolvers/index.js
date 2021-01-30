const { combineResolvers } = require('apollo-resolvers')
const { QueryMap } = require('./Query')
const { MutationMap } = require('./Mutation')
const { TokenMap } = require('./Token')

const resolvers = combineResolvers([
  QueryMap,
  MutationMap,
  TokenMap
])

module.exports = {
  resolvers
}
