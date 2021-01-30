const {
  createResolver
} = require('apollo-resolvers')
const {
  ApolloError
} = require('apollo-errors')
// const validator = require('validator')
const { User } = require('../../../db')

const UserRegisterM = createResolver(
  async (root, query, ctx) => {
    const {
      username,
      password,
      email
    } = query

    let user = await User.findOne({ email })

    if (user && user.active) {
      throw new ApolloError('USER_EXISTS', {
        data: { email },
        message: `User account for ${email} exists and is active`
      })
    }

    const active = true
    if (user) {
      Object.assign(user, { username, password, active })
    } else {
      user = new User({ username, password, email, active })
    }
    await user.save()

    return true
  }
)

module.exports = {
  Mutation: {
    UserRegisterM
  }
}
