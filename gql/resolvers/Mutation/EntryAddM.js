const {
  createResolver
} = require('apollo-resolvers')
const { default: asyncPool } = require('tiny-async-pool')
// const {
//   ApolloError
// } = require('apollo-errors')

const { Entry } = require('../../../db')
const { Tag } = require('../../../db')

const EntryAddM = createResolver(
  async (root, query, ctx) => {
    const {
      raw,
      description,
      date,
      timeStart,
      timeEnd,
      duration,
      tags
    } = query.entry

    const _tags = tags.map((tag, idx) => [tag, idx])

    await asyncPool(6, _tags, async ([tagName, idx]) => {
      const result = await Tag.findOneAndUpdate(
        {
          tagName
        },
        {
          tagName
        },
        {
          upsert: true,
          new: true
        }
      ).exec()
      tags[idx] = result
    })

    const entry = new Entry({
      raw,
      description,
      date,
      timeStart,
      timeEnd,
      duration,
      tags
    })
    await entry.save()

    // populating a saved doc is complicated!
    // this would query the db again:
    // await Entry.populate(entry, 'tags')
    // in this case we already have tags so we can do some entry.toObject
    // magic
    // this kind of thing won't work:
    // entry.set('tags', tags)

    return {
      ...entry.toObject(),
      tags: tags.map((tag) => tag.toObject())
    }
  }
)

module.exports = {
  Mutation: {
    EntryAddM
  }
}
