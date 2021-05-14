const {
  createResolver
} = require('apollo-resolvers')
const { Tag } = require('../../../db')

const TagQ = createResolver(
  async (root, query, ctx) => {
    const {
      offset = 0,
      limit = 20,
      showArchived = false,
      sort = { createdAt: 'desc' }
    } = query
    const {
      user
    } = ctx

    const filter = {}
    if (!showArchived)
      filter.archived = { $ne: true }
    // filter.team = user.team
    // console.log(await Tag.find({}))

    const {
      docs,
      totalDocs
    } = await Tag.paginate(
      filter,
      {
        offset,
        limit,
        sort
      }
    )

    const hasMore = (offset + limit) < totalDocs

    return { docs, hasMore }
  }
)

module.exports = {
  Query: {
    TagQ
  }
}
