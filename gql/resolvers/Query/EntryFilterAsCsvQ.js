const {
  createResolver
} = require('apollo-resolvers')
const {
  Transform
} = require('stream')
const stringify = require('csv-stringify')
const dayjs = require('dayjs')
const duration = require('dayjs/plugin/duration')
// const { default: asyncPool } = require('tiny-async-pool')
// const {
//   Tag
// } = require('../../../db')
const { Entry } = require('../../../db')

dayjs.extend(duration)

// const dayMs = 24 * 60 * 60 * 1000

const EntryFilterAsCsvQ = createResolver(
  async (root, query, ctx) => {
    const {
      limit = 20,
      dateFrom,
      dateTo,
      tags,
      dateFormat = 'DD/MM/YY',
      durationFormat = 'HH:mm'
    } = query

    const dates = [dateFrom, dateTo]
    dates.forEach((date) => {
      if (
        date.getUTCHours() !== 0 ||
        date.getUTCMinutes() !== 0 ||
        date.getUTCSeconds() !== 0 ||
        date.getUTCMilliseconds() !== 0
      )
        throw new RangeError('date is not UTC midnight', { date })
    })

    const filter = {
      deleted: { $ne: true },
      ...dateFrom || dateTo ? {
        date: {
          ...dateFrom ? { $gte: dateFrom } : {},
          ...dateTo ? { $lte: dateTo } : {}
        }
      } : {},
      ...tags && tags.length ? { tags: { $all: tags } } : {}
    }

    const entries = Entry.find(
      filter,
      null,
      {
        populate: 'tags',
        limit,
        sort: { createdAt: 'desc' }
      }
    ).cursor()

    const docToArray = new Transform({
      writableObjectMode: true,
      readableObjectMode: true,
      transform (chunk, encoding, callback) {
        let {
          date,
          duration,
          tags
        } = chunk
        const {
          description
        } = chunk
        date = dayjs(date).format(dateFormat)
        duration = dayjs.duration(duration * 60 * 1000).format(durationFormat)
        tags = tags.map(({ tagName }) => tagName).join(', ')
        const row = [date, duration, description, tags]
        callback(null, row)
      }
    })

    const stringifier = stringify()
    stringifier.write(['Date', 'Duration', 'Description', 'Tags'])

    const csvBuffers = []
    stringifier.on('data', (buf) => csvBuffers.push(buf))
    let csv
    let streamComplete
    stringifier.on('end', () => {
      csv = Buffer.concat(csvBuffers)
      streamComplete()
    })

    entries.pipe(docToArray)
    docToArray.pipe(stringifier)

    await new Promise((resolve) => { streamComplete = resolve })

    return csv.toString()
  }
)

module.exports = {
  Query: {
    EntryFilterAsCsvQ
  }
}
