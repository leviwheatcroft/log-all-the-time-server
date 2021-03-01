const { combineResolvers } = require('apollo-resolvers')
const UserQ = require('./UserQ')
const EntryQ = require('./EntryQ')
const EntryFilterQ = require('./EntryFilterQ')
const EntryFilterAsCsvQ = require('./EntryFilterAsCsvQ')
const TagPartialQ = require('./TagPartialQ')
const DurationByDayQ = require('./DurationByDayQ')

const QueryMap = combineResolvers([
  UserQ,
  EntryQ,
  EntryFilterQ,
  EntryFilterAsCsvQ,
  TagPartialQ,
  DurationByDayQ
])

module.exports = {
  QueryMap
}
