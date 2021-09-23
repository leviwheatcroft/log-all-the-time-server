const {
  createResolver
} = require('apollo-resolvers')

const SelfQ = createResolver(
  async (root, query, ctx) => {
    const {
      user
    } = ctx

    console.log(user)
    return user
  }
)

module.exports = {
  Query: {
    SelfQ
  }
}
