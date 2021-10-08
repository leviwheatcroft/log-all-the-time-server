const {
  createResolver
} = require('apollo-resolvers')
const {
  User,
  Team
} = require('../../../db')
const { getTokens } = require('../../../lib/jwt')
const {
  NewUserError
} = require('../../../lib/errors')

const UserRegisterM = createResolver(
  async (root, query, ctx) => {
    const {
      email,
      password,
      name
    } = query
    let user = await User.findOne({ where: { email } })

    if (user && user.active) {
      throw new NewUserError(
        `User account for ${email} exists and is active`,
        { data: { email } }
      )
    }

    let team = await Team.findOne()
    if (!team)
      team = await Team.create()

    const active = true
    if (user) {
      Object.assign(user, { name, password, active })
    } else {
      const TeamId = team.get('id')
      user = User.build({
        active,
        email,
        password,
        TeamId,
        name
      })
    }

    await user.save()
    return getTokens(user.get())
  }
)

module.exports = {
  Mutation: {
    UserRegisterM
  }
}
