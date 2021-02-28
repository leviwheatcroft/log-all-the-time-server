const { authWhitelist } = require('./authWhitelist')
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
    const user = await User.findOne({ _id: userId })
    ctx.user = user
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
