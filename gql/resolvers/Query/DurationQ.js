const {
  createResolver
} = require('apollo-resolvers')
const { Entry } = require('../../../db')

const dayMs = 24 * 60 * 60 * 1000

const DurationQ = createResolver(
  async (root, query, ctx) => {
    // const {
    //   limit = 20,
    //   dateFrom,
    //   dateTo,
    //   tags
    // } = query

    const result = await Entry.aggregate([
      {
        $match: { date: { $gte: Date.now() - (dayMs * 14) } }
      },
      {
        $group: {
          _id: '$date',
          $sum: 'duration'
        }
      }
    ])

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
    DurationQ
  }
}
