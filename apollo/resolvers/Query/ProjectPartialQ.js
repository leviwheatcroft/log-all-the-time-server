const { Op } = require('sequelize')
const {
  createResolver
} = require('apollo-resolvers')
const {
  Project,
  sequelize
} = require('../../../db')

const ProjectPartialQ = createResolver(
  async (root, query, ctx) => {
    const {
      offset = 0,
      limit = 24,
      projectPartial = '',
      order: _order = { name: 'desc', createdAt: 'desc' }
    } = query
    const {
      user: { TeamId }
    } = ctx

    const dialect = sequelize.getDialect()

    // http://sequelize.org/master/manual/model-querying-basics.html
    const order = Object.entries(_order)

    const { count, rows } = await Project.findAndCountAll({
      where: {
        TeamId,
        // operators are dialect specific
        // https://sequelize.org/master/manual/model-querying-basics.html
        ...projectPartial && dialect === 'sqlite' ? {
          name: {
            // for sqlite3 the like operator is case insensitive
            [Op.like]: `%${projectPartial}%`
          }
        } : {},
        ...projectPartial && dialect === 'postgres' ? {
          name: {
            // escape all the things
            // https://stackoverflow.com/a/35478115/441930
            [Op.iRegexp]: projectPartial.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
          }
        } : {}
      },
      limit,
      offset,
      order
    })

    const docs = rows.map(($project) => $project.toGql())

    const hasMore = (offset + limit < count)

    return { docs, hasMore }
  }
)

module.exports = {
  Query: {
    ProjectPartialQ
  }
}
