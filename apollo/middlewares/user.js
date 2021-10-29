const { authWhitelist } = require('./authWhitelist')
const {
  AuthFailedError
} = require('../../lib/errors')
const {
  User
} = require('../../db')

async function user (resolve, root, args, ctx, info) {
  const {
    fieldName
  } = info
  const {
    jwt
  } = ctx
  if (!authWhitelist.includes(fieldName)) {
    const {
      userId
    } = jwt
    const user = await User.findOne({ where: { id: userId } })
    if (!user) {
      throw new AuthFailedError({
        internalData: {
          detail: 'Token User does not exist',
          user
        }
      })
    }
    ctx.user = user.get()
  }

  const result = await resolve(root, args, ctx, info)

  return result
}

const userMap = {
  Query: user,
  Mutation: user
}

module.exports = {
  userMap
}
