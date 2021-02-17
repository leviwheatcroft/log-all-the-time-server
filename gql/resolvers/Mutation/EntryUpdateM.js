const {
  createResolver
} = require('apollo-resolvers')
const { default: asyncPool } = require('tiny-async-pool')
// const {
//   ApolloError
// } = require('apollo-errors')

const { Entry } = require('../../../db')
const { Tag } = require('../../../db')

const EntryUpdateM = createResolver(
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

    const _tags = tags.map((tag, idx) => [tag, idx])

    await asyncPool(6, _tags, async ([tag, idx]) => {
      const result = await Tag.findOneAndUpdate(
        {
          tag
        },
        {
          tag
        },
        {
          upsert: true,
          new: true
        }
      ).exec()
      tags[idx] = result
    })

    const entry = await Entry.findOneAndUpdate(
      {
        _id: id
      },
      {
        raw,
        description,
        date,
        timeStart,
        timeEnd,
        duration,
        tags
      },
      {
        new: true
      }
    ).exec()
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
    EntryUpdateM
  }
}
