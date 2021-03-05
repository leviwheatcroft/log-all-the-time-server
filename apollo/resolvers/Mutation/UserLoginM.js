const {
  createResolver
} = require('apollo-resolvers')
// const validator = require('validator')
const { User } = require('../../../db')
const { getTokens } = require('../../../lib/jwt')
const {
  AuthBadEmailError,
  AuthBadPasswordError,
  AuthInactiveUserError
} = require('../../../lib/errors')

const UserLoginM = createResolver(
  async (root, query, ctx) => {
    const {
      email,
      password
    } = query

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      throw new AuthBadEmailError(
        'There\'s no user with that email address',
        { data: { email } }
      )
    }

    if (!await user.comparePassword(password)) {
      throw new AuthBadPasswordError(
        'That password is incorrect'
      )
    }

    if (!user.active) {
      throw new AuthInactiveUserError(
        'This user account is inactive, you need to re-register'
      )
    }

    return getTokens(user)
  }
)

module.exports = {
  Mutation: {
    UserLoginM
  }
}
