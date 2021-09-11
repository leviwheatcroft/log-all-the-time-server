const {
  createResolver
} = require('apollo-resolvers')

const {
  Entry,
  Tag,
  Project,
  EntryTag
} = require('../../../db')

const EntryCreateM = createResolver(
  async (root, query, ctx) => {
    const {
      date,
      duration,
      description,
      project,
      tags
    } = query.entry
    const {
      user
    } = ctx
    const {
      id: UserId,
      TeamId
    } = user

    // create or populate tags
    // eslint-disable-next-line no-restricted-syntax
    for await (const tag of tags) {
      if (!tag.id) {
        const { tagName } = tag
        let [_tag] = await Tag.findOrCreate({
          where: { TeamId, tagName }
        })
        if (!_tag.get('active'))
          _tag = await _tag.update({ active: true })
        Object.assign(tag, _tag.get())
      }
    }
    // create or populate project
    if (!project.id) {
      const { projectName } = project
      let [_project] = await Project.findOrCreate({
        where: { TeamId, projectName }
      })
      if (!_project.active)
        _project = await _project.update({ active: true })
      Object.assign(project, _project.get())
    }

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

    // associate tags
    const EntryId = entry.id
    await EntryTag.bulkCreate(tags.map((t) => ({ TagId: t.id, EntryId })))

    const response = {
      ...entry.get(),
      user,
      project,
      tags
    }

    return response
  }
)

module.exports = {
  Mutation: {
    EntryCreateM
  }
}
