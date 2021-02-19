const { combineResolvers } = require('apollo-resolvers')
const UserQ = require('./UserQ')
const EntryQ = require('./EntryQ')
const EntryFilterQ = require('./EntryFilterQ')
const TagPartialQ = require('./TagPartialQ')

const QueryMap = combineResolvers([
  UserQ,
  EntryQ,
  EntryFilterQ,
  TagPartialQ
])

module.exports = {
  QueryMap
}
