const { combineResolvers } = require('apollo-resolvers')
const UserQ = require('./UserQ')
const EntryQ = require('./EntryQ')

const QueryMap = combineResolvers([
  UserQ,
  EntryQ
])

module.exports = {
  QueryMap
}
