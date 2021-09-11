// const { Duration } = require('./Duration')
const { Entry } = require('./Entry')
const { EntryI } = require('./EntryI')
const { Mutation } = require('./Mutation')
// const { Page } = require('./Page')
const { Query } = require('./Query')
const { Scalars } = require('./Scalars')
// const { SortI } = require('./SortI')
const { Tag } = require('./Tag')
const { TagI } = require('./TagI')
const { Project } = require('./Project')
const { ProjectI } = require('./ProjectI')
const { Token } = require('./Token')
const { Tokens } = require('./Tokens')
const { User } = require('./User')
// const { Doc } = require('./Doc')

const typeDefs = [
  // Duration,
  Entry,
  EntryI,
  Mutation,
  // Page,
  Query,
  Scalars,
  // SortI,
  Tag,
  TagI,
  Project,
  ProjectI,
  Token,
  Tokens,
  User,
  // Doc
]

module.exports = {
  typeDefs
}
