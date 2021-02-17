const { combineResolvers } = require('apollo-resolvers')
const UserQ = require('./UserQ')
const EntryQ = require('./EntryQ')
const EntryFilterQ = require('./EntryFilterQ')

const QueryMap = combineResolvers([
  UserQ,
  EntryQ,
  EntryFilterQ
])

module.exports = {
  QueryMap
}
