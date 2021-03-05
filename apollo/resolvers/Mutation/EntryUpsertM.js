const {
  createResolver
} = require('apollo-resolvers')

const { Entry } = require('../../../db')
const { Tag } = require('../../../db')

const EntryUpsertM = createResolver(
  async (root, query, ctx) => {
    const {
      id,
      date,
      duration,
      description,
      tags
    } = query.entry
    const {
      user
    } = ctx
    const {
      team
    } = user

    // managing tags here is a little strange.
    // we need tag.id for all tags, and a plain object like { id, tagName }
    // but we don't actually need the tag documents.
    // `tags` contains the plain objects (not documents), asyncPool here
    // populates tags.id

    // with requests from the ui, id will be present for existing tags
    // still sensible to check whether a tag with the same name exists though
    // presently `test > dbAdmin > repopulate` relies on being able to populate
    // tag ids here.

    // eslint-disable-next-line no-restricted-syntax
    for await (const tag of tags) {
      if (!tag.id) {
        const {
          tagName
        } = tag
        const _tag = await Tag.findOneAndUpdate(
          {
            team,
            tagName
          },
          {
            team,
            tagName
          },
          {
            new: true,
            upsert: true
          }
        )
        tag.id = _tag.id
      }
    }

    let entry
    if (id) {
      entry = await Entry.findOneAndUpdate(
        {
          _id: id
        },
        {
          user,
          team,
          description,
          date,
          duration,
          tags: tags.map(({ id }) => id)
        },
        {
          new: true
        }
      ).exec()
    } else {
      entry = new Entry({
        user,
        team,
        date,
        description,
        duration,
        tags: tags.map(({ id }) => id)
      })
      await entry.save()
    }
    // populating a saved doc is complicated!
    // this would query the db again:
    // await Entry.populate(entry, 'tags')
    // in this case we already have tags so we can do some entry.toObject
    // magic
    // this kind of thing won't work:
    // entry.set('tags', tags)
    const response = {
      ...entry.toObject(),
      tags
    }

    return response
  }
)

module.exports = {
  Mutation: {
    EntryUpsertM
  }
}
