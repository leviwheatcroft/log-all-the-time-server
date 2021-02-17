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
          upsert: true
        }
      ).exec()
      tags[idx] = result
    })

    let entry
    if (id) {
      entry = await Entry.findOneAndUpdate(
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
    } else {
      entry = new Entry({
        raw,
        description,
        date,
        timeStart,
        timeEnd,
        duration,
        tags
      })
      await entry.save()
    }

    return entry
  }
)

module.exports = {
  Mutation: {
    EntryUpsertM
  }
}
