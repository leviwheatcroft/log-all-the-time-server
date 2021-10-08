const { Op } = require('sequelize')
const {
  createResolver
} = require('apollo-resolvers')
const { Project } = require('../../../db')

const ProjectPartialQ = createResolver(
  async (root, query, ctx) => {
    const {
      projectPartial,
      limit = 24
    } = query
    const {
      user: { TeamId }
    } = ctx

    let projects = await Project.findAll({
      where: {
        TeamId,
        name: {
          // escape all the things
          // https://stackoverflow.com/a/35478115/441930
          [Op.iRegexp]: projectPartial.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        }
      },
      limit,
      order: [['createdAt', 'DESC']]
    })

    projects = projects.map((p) => p.get())
    return projects
  }
)

module.exports = {
  Query: {
    ProjectPartialQ
  }
}
