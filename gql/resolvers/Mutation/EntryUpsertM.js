const {
  createResolver
} = require('apollo-resolvers')
const { default: asyncPool } = require('tiny-async-pool')
// const {
//   ApolloError
// } = require('apollo-errors')

const { Entry } = require('../../../db')
const { Tag } = require('../../../db')

const EntryUpsertM = createResolver(
  async (root, query, ctx) => {
    const {
      id,
      raw,
      description,
      date,
      timeStart,
      timeEnd,
      duration,
      tags
    } = query.entry

    await asyncPool(6, tags, async (tag) => {
      if (tag.id)
        return
      const {
        tagName
      } = tag
      const newTag = new Tag({ tagName })
      await newTag.save()
      tag.id = newTag.id
    })

    let entry
    if (id) {
      entry = await Entry.findOneAndUpdate(
        {
          _id: id
        },
        {
          description,
          date,
          duration,
          tags
        },
        {
          new: true
        }
      ).exec()
    } else {
      entry = new Entry({
        date,
        description,
        duration,
        tags
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
      tags: tags.map((tag) => tag.toObject())
    }

    return response
  }
)

module.exports = {
  Mutation: {
    EntryUpsertM
  }
}
