const {
  createResolver
} = require('apollo-resolvers')

const {
  Entry,
  Project,
} = require('../../../db')

const EntryCreateM = createResolver(
  async (root, query, ctx) => {
    const {
      date,
      duration,
      description,
    } = query.entry
    let {
      tags,
      project
    } = query.entry
    const {
      user
    } = ctx
    const {
      id: UserId,
      TeamId
    } = user

    const $project = await Project.findCreateUnarchive(project, ctx)
    project = $project.toGql()

    // create entry
    const ProjectId = project.id
    const entry = await Entry.create({
      UserId,
      TeamId,
      ProjectId,
      description,
      date,
      duration,
    })

    const $tags = await entry.associateTags(tags, ctx)
    tags = $tags.map(($tag) => $tag.toGql())

    const response = entry.toGql({ user, project, tags })

    return response
  }
)

module.exports = {
  Mutation: {
    EntryCreateM
  }
}
