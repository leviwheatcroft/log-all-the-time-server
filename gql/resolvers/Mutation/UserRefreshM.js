const {
  createResolver
} = require('apollo-resolvers')
const jwt = require('jsonwebtoken')
const {
  Types: { ObjectId }
} = require('mongoose')
const {
  AuthRefreshTimeout
} = require('../../../lib/errors')
// const validator = require('validator')
const { User } = require('../../../db')
const { getAccessToken } = require('../../../lib/jwt')

const { JWT_SECRET } = process.env

const UserRefreshM = createResolver(
  async (_, query, ctx) => {
    const {
      refreshToken
    } = query
    const {
      userId,
      expiresAt
    } = jwt.verify(refreshToken, JWT_SECRET)
    console.log({ userId, expiresAt })
    if (Date.parse(expiresAt) < Date.now())
      throw new AuthRefreshTimeout('refreshToken has expired')

    const user = await User.findById(ObjectId(userId))
    const accessToken = getAccessToken(user)
    console.log(accessToken)
    return accessToken
  }
)

module.exports = {
  Mutation: {
    UserRefreshM
  }
}
