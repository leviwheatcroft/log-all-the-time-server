const { combineResolvers } = require('apollo-resolvers')
const UserQ = require('./UserQ')

const QueryMap = combineResolvers([
  UserQ
])

module.exports = {
  QueryMap
}
