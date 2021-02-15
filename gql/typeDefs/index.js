const { Mutation } = require('./Mutation')
const { Query } = require('./Query')
const { User } = require('./User')
const { Token } = require('./Token')
const { Tokens } = require('./Tokens')
const { Scalars } = require('./Scalars')
const { Entry, EntryI } = require('./Entry')

const typeDefs = [
  Mutation,
  Query,
  User,
  Token,
  Tokens,
  Scalars,
  Entry,
  EntryI
]

module.exports = {
  typeDefs
}
