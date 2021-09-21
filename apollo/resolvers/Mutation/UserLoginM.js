const {
  createResolver
} = require('apollo-resolvers')
const bcrypt = require('bcrypt')
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

    const user = await User.findOne({
      where: {
        email: email.toLowerCase()
      }
    })
    if (!user) {
      throw new AuthBadEmailError(
        'There\'s no user with that email address',
        { data: { email } }
      )
    }

    const passwordOk = await bcrypt.compare(password, user.get('password'))

    if (!passwordOk) {
      throw new AuthBadPasswordError(
        'That password is incorrect'
      )
    }

    if (!user.active) {
      throw new AuthInactiveUserError(
        'This user account is inactive, you need to re-register'
      )
    }

    return getTokens(user.get())
  }
)

module.exports = {
  Mutation: {
    UserLoginM
  }
}
