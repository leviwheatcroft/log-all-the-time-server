const {
  createResolver
} = require('apollo-resolvers')
const { Sequelize, Op } = require('sequelize')
const {
  Entry,
  EntryTag,
  Tag,
  Project,
  User
} = require('../../../db')

const EntryFilterQ = createResolver(
  async (root, query, ctx) => {
    const {
      offset = 0,
      limit = 20,
      dateFrom,
      dateTo,
      projects = [],
      tags = [],
      users = [],
      order: _order = { date: 'desc', createdAt: 'desc' }
    } = query
    const {
      user
    } = ctx

    const projectIds = projects.map(({ id }) => id)
    const userIds = users.map(({ id }) => id)
    // only allow integers to avoid a sql injection attack
    const tagIds = tags.map(({ id }) => id).filter((i) => Number.isInteger(i))

    const where = {
      [Op.and]: [
        { TeamId: user.TeamId },
        projects.length ? { ProjectId: { [Op.in]: projectIds } } : {},
        users.length ? { UserId: { [Op.in]: userIds } } : {},
        tags.length ? Sequelize.literal(`
          EXISTS(
            SELECT *
            FROM "EntryTags"
            WHERE
              "EntryTags"."EntryId" = "Entry"."id" AND
              "EntryTags"."TagId" IN (${tagIds.join(',')})
          )
        `) : {},
        dateFrom || dateTo ? {
          date: {
            ...dateFrom ? { [Op.gte]: dateFrom } : {},
            ...dateTo ? { [Op.lte]: dateTo } : {}
          }
        } : {}
      ]
    }

    // http://sequelize.org/master/manual/model-querying-basics.html
    const order = Object.entries(_order)

    const { count, rows } = await Entry.findAndCountAll(
      {
        where,
        order,
        offset,
        limit,
        include: [
          { model: EntryTag, include: Tag },
          { model: Project },
          { model: User }
        ]
      }
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
