const {
  createResolver
} = require('apollo-resolvers')

const { Entry } = require('../../../db')

const EntryDeleteM = createResolver(
  async (root, query, ctx) => {
    const {
      id
    } = query

    const entry = await Entry.findOneAndUpdate(
      {
        _id: id
      },
      {
        deleted: true
      },
      {
        new: true
      }
    ).exec()

    await entry.populate('tags').execPopulate()
    const response = entry.toObject()

    return response
  }
)

module.exports = {
  Mutation: {
    EntryDeleteM
  }
}
