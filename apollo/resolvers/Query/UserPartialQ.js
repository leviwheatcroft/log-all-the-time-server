const {
  createResolver
} = require('apollo-resolvers')
// eslint-disable-next-line no-unused-vars
const dbg = require('debug')('tl')
const { User } = require('../../../db')

const UserPartialQ = createResolver(
  async (root, query, ctx) => {
    const {
      userPartial,
      limit = 24
    } = query
    // const _id = query._id || ctx.jwt.userId
    const regExp = new RegExp(userPartial, 'i')

    let users = await User.find(
      {
        username: { $regex: regExp }
      },
      null,
      {
        limit,
        sort: { createdAt: 'desc' }
      }
    )

    users = users.map((t) => t.toObject())
    return users
  }
)

module.exports = {
  Query: {
    UserPartialQ
  }
}
