const {
  createResolver
} = require('apollo-resolvers')

const {
  Tag
} = require('../../../db')

const TagUpdateM = createResolver(
  async (root, query, ctx) => {
    const {
      tag: {
        id,
        name,
        archived
      }
    } = query
    const {
      user: {
        TeamId
      }
    } = ctx

    const $tag = await Tag.findOne({ where: { id, TeamId } })
    $tag.set({ name, archived })
    await $tag.save()

    return $tag.toGql()
  }
)

module.exports = {
  Mutation: {
    TagUpdateM
  }
}
