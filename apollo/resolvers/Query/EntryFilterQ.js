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
      offset = 0,
      limit = 20,
      dateFrom,
      dateTo,
      tags,
      users
    } = query

    const filter = {
      deleted: { $ne: true },
      ...dateFrom || dateTo ? {
        date: {
          ...dateFrom ? { $gte: dateFrom } : {},
          ...dateTo ? { $lte: dateTo } : {}
        }
      } : {},
      ...tags && tags.length ? { tags: { $all: tags } } : {},
      // this is an "in" search, on each document, the user field is a single
      // objectId, users here is an array of objectIds, so this
      // { user: users } structure is "find docs with user id's in this array"
      ...users && users.length ? { user: users } : {}
    }

    const {
      docs,
      totalDocs
    } = await Entry.paginate(
      filter,
      {
        populate: ['tags', 'user'],
        offset,
        limit,
        sort: { createdAt: 'desc' }
      }
    )

    // const {
    //   docs,
    //   totalDocs,
    //   hasPrevPage,
    //   hasNextPage,
    //   page,
    //   totalPages,
    //   prevPage,
    //   nextPage
    // } = result

    const hasMore = (offset + limit) < totalDocs
    // const entries = docs.map((e) => e.toObject())

    return { docs, hasMore }
  }
)

module.exports = {
  Query: {
    EntryFilterQ
  }
}
