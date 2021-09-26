const { combineResolvers } = require('apollo-resolvers')
// const UserQ = require('./UserQ')
// const EntryQ = require('./EntryQ')
const EntryFilterQ = require('./EntryFilterQ')
// const EntryFilterAsCsvQ = require('./EntryFilterAsCsvQ')
const TagPartialQ = require('./TagPartialQ')
const ProjectPartialQ = require('./ProjectPartialQ')
// const DurationByDayQ = require('./DurationByDayQ')
// const UserPartialQ = require('./UserPartialQ')
const SelfQ = require('./SelfQ')
// const TagQ = require('./TagQ')
const DaySummariesQ = require('./DaySummariesQ')

const QueryMap = combineResolvers([
  // UserQ,
  // EntryQ,
  EntryFilterQ,
  // EntryFilterAsCsvQ,
  TagPartialQ,
  ProjectPartialQ,
  DaySummariesQ,
  // DurationByDayQ,
  // UserPartialQ,
  SelfQ,
  // TagQ
])

module.exports = {
  QueryMap
}
