const {
  createResolver
} = require('apollo-resolvers')

const {
  Project
} = require('../../../db')

const ProjectUpdateM = createResolver(
  async (root, query, ctx) => {
    const {
      project: {
        id,
        name,
        archived
      }
    } = query
    const {
      user: {
        TeamId
      }
    } = ctx

    const $project = await Project.findOne({ where: { id, TeamId } })
    $project.set({ name, archived })
    await $project.save()

    return $project.toGql()
  }
)

module.exports = {
  Mutation: {
    ProjectUpdateM
  }
}
