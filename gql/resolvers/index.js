const { combineResolvers } = require('apollo-resolvers')
const { QueryMap } = require('./Query')
const { MutationMap } = require('./Mutation')
const { TokenMap } = require('./Token')
const { DateMap } = require('./Date')
const { ObjectIdMap } = require('./ObjectId')

const resolvers = combineResolvers([
  QueryMap,
  MutationMap,
  TokenMap,
  DateMap,
  ObjectIdMap
])

module.exports = {
  resolvers
}
