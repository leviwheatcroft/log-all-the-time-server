const {
  createResolver
} = require('apollo-resolvers')
// eslint-disable-next-line no-unused-vars
const dbg = require('debug')('tl')
const { Entry } = require('../../../db')

const EntryQ = createResolver(
  async (root, query, ctx) => {
    const {
      limit = 20
    } = query

    const entries = await Entry.find(
      {
        deleted: { $ne: true }
      },
      null,
      {
        populate: 'tags',
        limit,
        sort: { createdAt: 'desc' }
      }
    )

    return entries
  }
)

module.exports = {
  Query: {
    EntryQ
  }
}
