const {
  createResolver
} = require('apollo-resolvers')
// eslint-disable-next-line no-unused-vars
const dbg = require('debug')('tl')
const { Tag } = require('../../../db')

const TagPartialQ = createResolver(
  async (root, query, ctx) => {
    const {
      tagPartial,
      limit = 24
    } = query
    // const _id = query._id || ctx.jwt.userId
    const regExp = new RegExp(
      // https://stackoverflow.com/a/35478115/441930
      tagPartial.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'),
      'i'
    )

    let tags = await Tag.find(
      {
        tagName: { $regex: regExp }
      },
      null,
      {
        limit,
        sort: { createdAt: 'desc' }
      }
    )

    tags = tags.map((t) => t.toObject())
    return tags
  }
)

module.exports = {
  Query: {
    TagPartialQ
  }
}
