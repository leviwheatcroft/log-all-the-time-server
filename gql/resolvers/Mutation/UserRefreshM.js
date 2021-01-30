const {
  createResolver
} = require('apollo-resolvers')
const {
  Types: { ObjectId }
} = require('mongoose')
const {
  AUTH_REFRESH_TIMEOUT
} = require('../../../lib/errors')
// const validator = require('validator')
const { User } = require('../../../db')
const { getAccessToken } = require('../../../lib/jwt')

const UserRefreshM = createResolver(
  async (_, query, ctx) => {
    const {
      refreshToken: {
        userId,
        expiresAt
      }
    } = query
    if (expiresAt.getTime() < Date.now())
      throw new AUTH_REFRESH_TIMEOUT()

    const user = await User.findById(ObjectId(userId))

    return getAccessToken(user)
  }
)

module.exports = {
  Mutation: {
    UserRefreshM
  }
}
