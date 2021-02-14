const jwt = require('jsonwebtoken')
const {
  AuthFailedError,
  AuthAccessTimeoutError
} = require('../../lib/errors')
const { authWhitelist } = require('./authWhitelist')

const { JWT_SECRET } = process.env

async function authentication (resolve, root, args, ctx, info) {
  const {
    fieldName
  } = info
  const {
    req
  } = ctx
  if (!authWhitelist.includes(fieldName)) {
    const authorizationHeader = req.get('authorization')
    if (!authorizationHeader)
      throw new AuthFailedError('No authorization header provided.')

    let token
    try {
      token = jwt.verify(
        authorizationHeader.replace(/Bearer /, ''),
        JWT_SECRET
      )
    } catch (err) {
      throw new AuthFailedError('Malformed token.')
    }

    token.expiresAt = Date.parse(token.expiresAt)

    ctx.jwt = token

    if (ctx.jwt.expiresAt < Date.now())
      throw new AuthAccessTimeoutError('Access token has timed out.')
  }

  const result = await resolve(root, args, ctx, info)

  return result
}

const authenticationMap = {
  Query: authentication,
  Mutation: authentication
}

module.exports = {
  authenticationMap
}
