const {
  createResolver
} = require('apollo-resolvers')
const {
  ApolloError
} = require('apollo-errors')
// const validator = require('validator')
const { User } = require('../../../db')
const { getTokens } = require('../../../lib/jwt')

const UserLoginM = createResolver(
  async (root, query, ctx) => {
    const {
      email,
      password
    } = query

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      throw new ApolloError('badUser', {
        message: `No user with email ${email}`,
        data: { email }
      })
    }

    if (!await user.comparePassword(password)) {
      throw new ApolloError('badPassword', {
        message: 'Incorrect Password'
      })
    }

    if (!user.active) {
      throw new ApolloError('inactiveUser', {
        message: `User ${email} is inactive, re-register`,
        data: { email }
      })
    }

    return getTokens(user)
  }
)

module.exports = {
  Mutation: {
    UserLoginM
  }
}
