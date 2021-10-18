const { Op } = require('sequelize')
const {
  createResolver
} = require('apollo-resolvers')
const {
  Tag,
  sequelize
} = require('../../../db')

const TagPartialQ = createResolver(
  async (root, query, ctx) => {
    const {
      offset = 0,
      limit = 24,
      tagPartial = '',
      includeArchived = false,
      order: _order = { name: 'desc', createdAt: 'desc' }
    } = query
    const {
      user: { TeamId }
    } = ctx

    const dialect = sequelize.getDialect()

    // http://sequelize.org/master/manual/model-querying-basics.html
    const order = Object.entries(_order)

    const { count, rows } = await Tag.findAndCountAll({
      where: {
        TeamId,
        ...includeArchived === false ? { archived: false } : {},
        // operators are dialect specific
        // https://sequelize.org/master/manual/model-querying-basics.html
        ...tagPartial && dialect === 'sqlite' ? {
          name: {
            // for sqlite3 the like operator is case insensitive
            [Op.like]: `%${tagPartial}%`
          }
        } : {},
        ...tagPartial && dialect === 'postgres' ? {
          name: {
            // escape all the things
            // https://stackoverflow.com/a/35478115/441930
            [Op.iRegexp]: tagPartial.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
          }
        } : {}
      },
      limit,
      offset,
      order
    })

    const docs = rows.map(($tag) => $tag.toGql())

    const hasMore = (offset + limit < count)

    return { docs, hasMore }
  }
)

module.exports = {
  Query: {
    TagPartialQ
  }
}
