/**
  Model relationships here are very complex.
*/
const {
  createResolver
} = require('apollo-resolvers')

const {
  Entry,
  Project,
} = require('../../../db')

const EntryUpdateM = createResolver(
  async (root, query, ctx) => {
    const {
      id,
      date,
      duration,
      description,
      project,
      tags
    } = query.entry

    const $entry = await Entry.findOne(Entry.withIncludes(
      { where: { id } },
      {
        tags: false
      }
    ))

    const $tags = await $entry.associateTags(tags, ctx)

    const $project = project.id === $entry.ProjectId ?
      $entry.Project :
      await Project.findCreateUnarchive(project, ctx)

    $entry.set({
      date,
      duration,
      description,
      Project: $project
    })

    await $entry.save()

    return $entry.toGql({ $tags })
  }
)

module.exports = {
  Mutation: {
    EntryUpdateM
  }
}
