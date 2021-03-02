const {
  createResolver
} = require('apollo-resolvers')
const {
  User,
  Team
} = require('../../../db')
const {
  NewUserError
} = require('../../../lib/errors')

const UserRegisterM = createResolver(
  async (root, query, ctx) => {
    const {
      email,
      password,
      username
    } = query

    let user = await User.findOne({ email })

    if (user && user.active) {
      throw new NewUserError(
        `User account for ${email} exists and is active`,
        { data: { email } }
      )
    }

    let team = await Team.findOne()
    if (!team) {
      team = new Team()
      await team.save()
    }

    const active = true
    if (user) {
      Object.assign(user, { username, password, active })
    } else {
      user = new User({
        active,
        email,
        password,
        team,
        username
      })
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
