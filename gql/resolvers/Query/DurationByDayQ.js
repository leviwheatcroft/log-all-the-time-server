const {
  createResolver
} = require('apollo-resolvers')
const { Entry } = require('../../../db')

const DurationByDayQ = createResolver(
  async (root, query, ctx) => {
    const {
      dateFrom,
      dateTo
    } = query

    const result = await Entry.aggregate([
      {
        $match: {
          date: {
            $gte: dateFrom,
            $lte: dateTo
          },
          deleted: { $ne: true }
        }
      },
      {
        $group: {
          _id: '$date',
          // dateStart: '$date',
          // dateEnd: '$date',
          duration: { $sum: '$duration' }
        }
      }
    ]).exec()

    return result.map(({ _id, duration }) => ({ id: _id, duration }))
  }
)

module.exports = {
  Query: {
    DurationByDayQ
  }
}
