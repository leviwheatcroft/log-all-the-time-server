const { AuthUnauthorizedError } = require('../../lib/errors')
const { authWhitelist } = require('./authWhitelist')

const adminRequired = []

async function authorization (resolve, root, args, ctx, info) {
  const {
    fieldName
  } = info

  if (
    (!authWhitelist.includes(fieldName)) &&
    (!ctx.jwt || !ctx.jwt.grants.basic)
  ) {
    throw new AuthUnauthorizedError({
      internalData: {
        detail: 'User does not have basic grant'
      }
    })
  }
  if (
    (adminRequired.includes(fieldName)) &&
    (!ctx.jwt || !ctx.jwt.grants.admin)
  ) {
    throw new AuthUnauthorizedError({
      internalData: {
        detail: 'User does not have admin grant'
      }
    })
  }

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
