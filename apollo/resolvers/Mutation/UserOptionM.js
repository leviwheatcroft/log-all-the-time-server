const {
  createResolver
} = require('apollo-resolvers')
const { UserOption } = require('../../../db')

const UserOptionM = createResolver(
  async (root, query, ctx) => {
    const {
      exportDateFormat,
      exportDurationFormat
    } = query
    const {
      user: { id }
    } = ctx

    const $userOption = await UserOption.findOne({ where: { UserId: id } })

    if (exportDateFormat)
      $userOption.exportDateFormat = exportDateFormat
    if (exportDurationFormat)
      $userOption.exportDurationFormat = exportDurationFormat

    await $userOption.save()

    return $userOption.toGql()
  }
)

module.exports = {
  Mutation: {
    UserOptionM
  }
}
