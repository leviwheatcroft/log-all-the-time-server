const jwt = require('jsonwebtoken')
const {
  undefined: isUndefined
} = require('check-types')
const {
  AUTH_FAILED,
  AUTH_ACCESS_TIMEOUT,
  RANGE_ERROR
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
    if (isUndefined(authorizationHeader))
      throw new RANGE_ERROR()
    if (isUndefined(JWT_SECRET))
      throw new RANGE_ERROR()

    let token
    try {
      token = jwt.verify(
        authorizationHeader.replace(/Bearer /, ''),
        JWT_SECRET
      )
    } catch (err) {
      throw new AUTH_FAILED({ internalData: { jwt } })
    }

    ctx.jwt = token

    if (ctx.jwt.expiresAt < Date.now())
      throw new AUTH_ACCESS_TIMEOUT()
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
