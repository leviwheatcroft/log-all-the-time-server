const {
  createResolver
} = require('apollo-resolvers')
const jwt = require('jsonwebtoken')
const {
  AuthRefreshTimeoutError
} = require('../../../lib/errors')
// const validator = require('validator')
const { User } = require('../../../db')
const { getAccessToken } = require('../../../lib/jwt')
const {
  AuthInactiveUserError
} = require('../../../lib/errors')

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

    if (Date.parse(expiresAt) < Date.now())
      throw new AuthRefreshTimeoutError('refreshToken has expired')

    const user = await User.findOne({ where: { id: userId } })
    if (!user) {
      throw new AuthInactiveUserError(
        'That user doesn\'t exist or is inactive?!'
      )
    }

    const accessToken = getAccessToken(user.get())

    return accessToken
  }
)

module.exports = {
  Mutation: {
    UserRefreshM
  }
}
