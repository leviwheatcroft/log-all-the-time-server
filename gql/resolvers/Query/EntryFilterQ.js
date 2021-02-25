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

const dayMs = 24 * 60 * 60 * 1000

const EntryFilterQ = createResolver(
  async (root, query, ctx) => {
    const {
      limit = 20,
      dateFrom,
      dateTo,
      tags
    } = query

    // const tagIds = []
    // if (tags && tags.length) {
    //   await asyncPool(6, tags, async (tagName) => {
    //     const result = await Tag.findOne({
    //       tagName
    //     }).exec()
    //     if (result)
    //       tagIds.push(result._id)
    //   })
    // }

    const filter = {
      ...dateFrom || dateTo ? {
        date: {
          ...dateFrom ? { $gte: dateFrom } : {},
          ...dateTo ? { $lte: new Date(dateTo.valueOf() + dayMs) } : {}
        }
      } : {},
      ...tags.length ? { tags: { $all: tags } } : {}
    }

    const entries = await Entry.find(
      filter,
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
