const { Duration } = require('./Duration')
const { Entry } = require('./Entry')
const { Page } = require('./Page')
const { EntryI } = require('./EntryI')
const { Mutation } = require('./Mutation')
const { Query } = require('./Query')
const { Scalars } = require('./Scalars')
const { Tag } = require('./Tag')
const { TagI } = require('./TagI')
const { Token } = require('./Token')
const { Tokens } = require('./Tokens')
const { User } = require('./User')

const typeDefs = [
  Duration,
  Entry,
  Page,
  EntryI,
  Mutation,
  Query,
  Scalars,
  Tag,
  TagI,
  Token,
  Tokens,
  User
]

module.exports = {
  typeDefs
}
