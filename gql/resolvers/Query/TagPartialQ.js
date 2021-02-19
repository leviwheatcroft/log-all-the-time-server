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
    const regExp = new RegExp(tagPartial, 'i')

    let tags = await Tag.find(
      {
        tag: { $regex: regExp }
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
