const { combineResolvers } = require('apollo-resolvers')
const { QueryMap } = require('./Query')
const { MutationMap } = require('./Mutation')
const { TokenMap } = require('./Token')
const { DateMap } = require('./Date')
const { DateMidnightUtcMap } = require('./DateMidnightUtc')
const { ObjectIdMap } = require('./ObjectId')
const { DocMap } = require('./Doc')

const resolvers = combineResolvers([
  QueryMap,
  MutationMap,
  TokenMap,
  DateMap,
  DateMidnightUtcMap,
  ObjectIdMap,
  DocMap
])

module.exports = {
  resolvers
}
