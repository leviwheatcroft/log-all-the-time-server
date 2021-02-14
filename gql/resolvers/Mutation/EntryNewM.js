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
      date,
      project,
      description
    } = query

    const entry = new Entry({
      date,
      project,
      description
    })

    await entry.save()

    return true
  }
)

module.exports = {
  Mutation: {
    EntryNewM
  }
}
