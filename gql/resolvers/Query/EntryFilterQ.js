const {
  createResolver
} = require('apollo-resolvers')
const {
  Tag
} = require('../../../db')
// eslint-disable-next-line no-unused-vars
const dbg = require('debug')('tl')
const { Entry } = require('../../../db')

const EntryFilterQ = createResolver(
  async (root, query, ctx) => {
    const {
      limit = 20,
      dateFrom,
      dateTo
    } = query
    let {
      tags
    } = query
    // const _id = query._id || ctx.jwt.userId
    if (tags) {
      tags = await Tag.findOne({
        tag: tags
      }).exec()
    }
    const entries = await Entry.find(
      {
        ...dateFrom || dateTo ? {
          date: {
            ...dateFrom ? { $gte: dateFrom } : {},
            ...dateTo ? { $lte: dateTo } : {}
          }
        } : {},
        ...tags ? { tags: tags._id } : {}
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
    EntryFilterQ
  }
}
