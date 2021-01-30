const { combineResolvers } = require('apollo-resolvers')
const { QueryMap } = require('./Query')
const { MutationMap } = require('./Mutation')

const resolvers = combineResolvers([
  QueryMap,
  MutationMap
])

module.exports = {
  resolvers
}
