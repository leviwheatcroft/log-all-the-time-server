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

// const dayMs = 24 * 60 * 60 * 1000

const EntryFilterQ = createResolver(
  async (root, query, ctx) => {
    const {
      limit = 20,
      dateFrom,
      dateTo,
      tags
    } = query

    const dates = [dateFrom, dateTo]
    dates.forEach((date) => {
      if (
        date.getUTCHours() !== 0 ||
        date.getUTCMinutes() !== 0 ||
        date.getUTCSeconds() !== 0 ||
        date.getUTCMilliseconds() !== 0
      )
        throw new RangeError('date is not UTC midnight', { date })
    })

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
