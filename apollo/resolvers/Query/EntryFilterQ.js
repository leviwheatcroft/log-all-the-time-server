const dayjs = require('dayjs')
const {
  createResolver
} = require('apollo-resolvers')
const { Op } = require('sequelize')
// const { default: asyncPool } = require('tiny-async-pool')
// const {
//   Tag
// } = require('../../../db')
const {
  Entry,
  EntryTag,
  Tag,
  User,
  Project
} = require('../../../db')

const EntryFilterQ = createResolver(
  async (root, query, ctx) => {
    const {
      offset = 0,
      limit = 20,
      dateFrom,
      dateTo,
      project,
      tags,
      users,
      order: _order = { date: 'desc', createdAt: 'desc' },
      self = false
    } = query
    const {
      user
    } = ctx

    const _users = users && users.length ? users.map(({ id }) => id) : false
    const _tags = tags && tags.length ? tags.map(({ id }) => id) : false

    if (_users && self)
      throw new Error('can not filter by both users and self')

    const where = {
      active: true,
      TeamId: user.TeamId,
      ...project ? { ProjectId: project } : {},
      ..._users ? { UserId: { [Op.in]: users } } : {},
      ...self ? { UserId: user.id } : {},
      ...dateFrom || dateTo ? {
        date: {
          ...dateFrom ? { [Op.gte]: dateFrom } : {},
          ...dateTo ? { [Op.lte]: dateTo } : {}
        }
      } : {}
    }
    const include = [
      {
        model: EntryTag,
        ..._tags ? {
          where: {
            TagId: { [Op.in]: _tags }
          },
          required: true
        } : {},
        include: {
          model: Tag
        }
      },
      {
        model: User
      },
      {
        model: Project
      }
    ]

    // http://sequelize.org/master/manual/model-querying-basics.html
    const order = Object.entries(_order)

    const { count, rows } = await Entry.findAndCountAll({
      where,
      include,
      order,
      offset,
      limit,
    })

    // console.log(rows[0])
    const docs = rows.map((entry) => {
      return {
        ...entry.get(),
        project: entry.Project.get(),
        date: dayjs(entry.date),
        user: entry.User.get(),
        tags: entry.EntryTags.map(({ Tag }) => Tag.get()),
      }
    })

    const hasMore = (offset + limit) < count

    return { docs, hasMore }
  }
)

module.exports = {
  Query: {
    EntryFilterQ
  }
}
