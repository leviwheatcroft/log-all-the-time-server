const {
  createResolver
} = require('apollo-resolvers')
const { Op } = require('sequelize')
const {
  Entry,
} = require('../../../db')

const EntryFilterQ = createResolver(
  async (root, query, ctx) => {
    const {
      offset = 0,
      limit = 20,
      dateFrom,
      dateTo,
      project,
      tags = [],
      users = [],
      order: _order = { date: 'desc', createdAt: 'desc' },
      self = false
    } = query
    const {
      user
    } = ctx

    const where = {
      TeamId: user.TeamId,
      ...project ? { ProjectId: project } : {},
      ...users.length ? { UserId: { [Op.in]: users } } : {},
      ...self ? { UserId: user.id } : {},
      ...dateFrom || dateTo ? {
        date: {
          ...dateFrom ? { [Op.gte]: dateFrom } : {},
          ...dateTo ? { [Op.lte]: dateTo } : {}
        }
      } : {}
    }

    // http://sequelize.org/master/manual/model-querying-basics.html
    const order = Object.entries(_order)

    const { count, rows } = await Entry.findAndCountAll(
      Entry.withIncludes(
        {
          where,
          order,
          offset,
          limit,
        },
        {
          tags: tags.length ? tags.map(({ id }) => id) : true
        }
      )
    )

    const docs = rows.map(($entry) => $entry.toGql())

    const hasMore = (offset + limit) < count

    return { docs, hasMore }
  }
)

module.exports = {
  Query: {
    EntryFilterQ
  }
}
