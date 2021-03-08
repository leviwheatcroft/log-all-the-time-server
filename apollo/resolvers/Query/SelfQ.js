const {
  createResolver
} = require('apollo-resolvers')

const SelfQ = createResolver(
  async (root, query, ctx) => {
    const {
      user
    } = ctx

    return user
  }
)

module.exports = {
  Query: {
    SelfQ
  }
}
