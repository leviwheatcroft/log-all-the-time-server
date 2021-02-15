const {
  createResolver
} = require('apollo-resolvers')
// const {
//   ApolloError
// } = require('apollo-errors')

const { Entry } = require('../../../db')

const EntryNewM = createResolver(
  async (root, query, ctx) => {
    const {
      raw,
      date,
      timeStart,
      timeEnd,
      duration,
      tags
    } = query.entry

    const entry = new Entry({
      raw,
      date,
      timeStart,
      timeEnd,
      duration,
      tags
    })

    await entry.save()

    return entry
  }
)

module.exports = {
  Mutation: {
    EntryNewM
  }
}
