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
      users,
      sort = { date: 'desc', createdAt: 'desc' },
      self = false
    } = query
    const {
      user
    } = ctx

    const filter = {}
    filter.deleted = { $ne: true }
    filter.team = user.team
    if (dateFrom || dateTo) {
      filter.date = {
        ...dateFrom ? { $gte: dateFrom } : {},
        ...dateTo ? { $lte: dateTo } : {}
      }
    }

    if (tags && tags.length)
      filter.tags = { tags: { $all: tags } }
    // this is an "in" search, on each document, the user field is a single
    // objectId, users here is an array of objectIds, so this
    // { user: users } structure is "find docs with user id's in this array"
    if (users && users.length)
      filter.user = users
    if (self)
      filter.user = [user.id]

    const {
      docs,
      totalDocs
    } = await Entry.paginate(
      filter,
      {
        populate: ['tags', 'user'],
        offset,
        limit,
        sort
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
