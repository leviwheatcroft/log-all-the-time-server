const { Mutation } = require('./Mutation')
const { Query } = require('./Query')
const { User } = require('./User')
const { Token } = require('./Token')
const { Tokens } = require('./Tokens')
const { Scalars } = require('./Scalars')
const { Entry } = require('./Entry')
const { EntryI } = require('./EntryI')
const { Tag } = require('./Tag')
const { TagI } = require('./TagI')

const typeDefs = [
  Mutation,
  Query,
  User,
  Token,
  Tokens,
  Scalars,
  Entry,
  EntryI,
  Tag,
  TagI
]

module.exports = {
  typeDefs
}
