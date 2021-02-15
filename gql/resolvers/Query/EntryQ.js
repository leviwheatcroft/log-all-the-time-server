const {
  createResolver
} = require('apollo-resolvers')
// eslint-disable-next-line no-unused-vars
const dbg = require('debug')('tl')
const { Entry } = require('../../../db')

const EntryQ = createResolver(
  async (root, query, ctx) => {
    // const _id = query._id || ctx.jwt.userId
    const entries = await Entry.find({})
    console.log(entries)
    return entries
  }
)

module.exports = {
  Query: {
    EntryQ
  }
}
