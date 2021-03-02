const {
  createResolver
} = require('apollo-resolvers')
// eslint-disable-next-line no-unused-vars
const dbg = require('debug')('tl')
const { User } = require('../../../db')

const UserQ = createResolver(
  async (root, query, ctx) => {
    const _id = query._id || ctx.jwt.userId
    const user = await User.findOne(
      {
        _id
      }
    )
    return user
  }
)

module.exports = {
  Query: {
    UserQ
  }
}
