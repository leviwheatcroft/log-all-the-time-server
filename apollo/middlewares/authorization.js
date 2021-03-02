const { AUTH_UNAUTHORIZED } = require('../../lib/errors')
const { authWhitelist } = require('./authWhitelist')

const adminRequired = []

async function authorization (resolve, root, args, ctx, info) {
  const {
    fieldName
  } = info

  if (
    (!authWhitelist.includes(fieldName)) &&
    (!ctx.jwt || !ctx.jwt.grants.basic)
  )
    throw new AUTH_UNAUTHORIZED()
  if (
    (adminRequired.includes(fieldName)) &&
    (!ctx.jwt || !ctx.jwt.grants.admin)
  )
    throw new AUTH_UNAUTHORIZED()

  const result = await resolve(root, args, ctx, info)

  return result
}

const authorizationMap = {
  Query: authorization,
  Mutation: authorization
}

module.exports = {
  authorizationMap
}
