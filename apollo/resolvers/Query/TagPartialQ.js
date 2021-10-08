const { Op } = require('sequelize')
const {
  createResolver
} = require('apollo-resolvers')
const { Tag } = require('../../../db')

const TagPartialQ = createResolver(
  async (root, query, ctx) => {
    const {
      tagPartial,
      limit = 24
    } = query
    const {
      user: { TeamId }
    } = ctx

    let tags = await Tag.findAll({
      where: {
        TeamId,
        name: {
          // escape all the things
          // https://stackoverflow.com/a/35478115/441930
          [Op.iRegexp]: tagPartial.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        }
      },
      limit,
      order: [['createdAt', 'DESC']]
    })

    tags = tags.map((t) => t.get())
    return tags
  }
)

module.exports = {
  Query: {
    TagPartialQ
  }
}
