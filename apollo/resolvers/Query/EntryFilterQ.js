const {
  createResolver
} = require('apollo-resolvers')
// eslint-disable-next-line no-unused-vars
const dbg = require('debug')('tl')
// const { default: asyncPool } = require('tiny-async-pool')
// const {
//   Tag
// } = require('../../../db')
const { Entry } = require('../../../db')

const EntryFilterQ = createResolver(
  async (root, query, ctx) => {
    const {
      limit = 20,
      dateFrom,
      dateTo,
      tags
    } = query

    const filter = {
      deleted: { $ne: true },
      ...dateFrom || dateTo ? {
        date: {
          ...dateFrom ? { $gte: dateFrom } : {},
          ...dateTo ? { $lte: dateTo } : {}
        }
      } : {},
      ...tags && tags.length ? { tags: { $all: tags } } : {}
    }

    const entries = await Entry.find(
      filter,
      null,
      {
        populate: ['tags', 'user'],
        limit,
        sort: { createdAt: 'desc' }
      }
    )

    return entries.map((e) => e.toObject())
  }
)

module.exports = {
  Query: {
    EntryFilterQ
  }
}
