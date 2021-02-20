const {
  createResolver
} = require('apollo-resolvers')
// eslint-disable-next-line no-unused-vars
const dbg = require('debug')('tl')
const { default: asyncPool } = require('tiny-async-pool')
const {
  Tag
} = require('../../../db')
const { Entry } = require('../../../db')

const EntryFilterQ = createResolver(
  async (root, query, ctx) => {
    const {
      limit = 20,
      dateFrom,
      dateTo,
      tags
    } = query

    const tagIds = []
    if (tags && tags.length) {
      await asyncPool(6, tags, async (tag) => {
        const result = await Tag.findOne({
          tag
        }).exec()
        if (result)
          tagIds.push(result._id)
      })
    }

    const entries = await Entry.find(
      {
        ...dateFrom || dateTo ? {
          date: {
            ...dateFrom ? { $gte: dateFrom } : {},
            ...dateTo ? { $lte: dateTo } : {}
          }
        } : {},
        ...tagIds.length ? { tags: { $all: tagIds } } : {}
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
