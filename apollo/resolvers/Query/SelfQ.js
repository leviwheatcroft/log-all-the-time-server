const {
  createResolver
} = require('apollo-resolvers')
const {
  User,
  UserDialog,
  UserOption
} = require('../../../db')

const SelfQ = createResolver(
  async (root, query, ctx) => {
    const {
      user: { id }
    } = ctx

    const user = await User.findOne({
      where: { id },
      include: [
        { model: UserDialog },
        { model: UserOption }
      ]
    })

    return user.toGql()
  }
)

module.exports = {
  Query: {
    SelfQ
  }
}
