// const { Duration } = require('./Duration')
const { Entry } = require('./Entry')
const { EntryI } = require('./EntryI')
const { Mutation } = require('./Mutation')
const { Page } = require('./Page')
const { Query } = require('./Query')
const { Scalars } = require('./Scalars')
const { OrderI } = require('./OrderI')
const { Tag } = require('./Tag')
const { TagI } = require('./TagI')
const { Project } = require('./Project')
const { ProjectI } = require('./ProjectI')
const { Token } = require('./Token')
const { Tokens } = require('./Tokens')
const { User } = require('./User')
const { UserI } = require('./UserI')
const { Doc } = require('./Doc')
const { ProjectSummary } = require('./ProjectSummary')
const { DaySummary } = require('./DaySummary')
const { DaySummaries } = require('./DaySummaries')
const { Dialog } = require('./Dialog')
const { Options } = require('./Options')

const typeDefs = [
  // Duration,
  DaySummary,
  DaySummaries,
  Entry,
  EntryI,
  Mutation,
  Page,
  Query,
  Scalars,
  OrderI,
  Tag,
  TagI,
  Project,
  ProjectI,
  ProjectSummary,
  Token,
  Tokens,
  User,
  UserI,
  Doc,
  Dialog,
  Options
]

module.exports = {
  typeDefs
}
