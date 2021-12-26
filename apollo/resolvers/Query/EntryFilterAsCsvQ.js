const {
  createResolver
} = require('apollo-resolvers')
const {
  Transform
} = require('stream')
const { Sequelize, Op } = require('sequelize')
const stringify = require('csv-stringify')
const dayjs = require('dayjs')
const duration = require('dayjs/plugin/duration')
const {
  Entry,
  EntryTag,
  Tag,
  Project,
  User,
  UserOption
} = require('../../../db')

dayjs.extend(duration)

// const dayMs = 24 * 60 * 60 * 1000

const EntryFilterAsCsvQ = createResolver(
  async (root, query, ctx) => {
    const {
      dateFrom,
      dateTo,
      projects = [],
      tags = [],
      users = [],
      order: _order = { date: 'desc', createdAt: 'desc' }
    } = query
    const {
      user
    } = ctx

    const $user = await User.findOne({
      where: { id: user.id },
      include: [
        { model: UserOption }
      ]
    })

    const exportDateFormat = $user.UserOption.get('exportDateFormat')
    const exportDurationFormat = $user.UserOption.get('exportDurationFormat')

    const projectIds = projects.map(({ id }) => id)
    const userIds = users.map(({ id }) => id)
    // only allow integers to avoid a sql injection attack
    const tagIds = tags.map(({ id }) => id).filter((i) => Number.isInteger(i))

    const where = {
      [Op.and]: [
        { TeamId: user.TeamId },
        projects.length ? { ProjectId: { [Op.in]: projectIds } } : {},
        users.length ? { UserId: { [Op.in]: userIds } } : {},
        tags.length ? Sequelize.literal(`
          EXISTS(
            SELECT *
            FROM "EntryTags"
            WHERE
              "EntryTags"."EntryId" = "Entry"."id" AND
              "EntryTags"."TagId" IN (${tagIds.join(',')})
          )
        `) : {},
        dateFrom || dateTo ? {
          date: {
            ...dateFrom ? { [Op.gte]: dateFrom } : {},
            ...dateTo ? { [Op.lte]: dateTo } : {}
          }
        } : {}
      ]
    }

    // http://sequelize.org/master/manual/model-querying-basics.html
    const order = Object.entries(_order)

    const rows = await Entry.findAllStream(
      {
        where,
        order,
        include: [
          { model: EntryTag, include: Tag },
          { model: Project },
          { model: User }
        ]
      }
    )

    const docToArray = new Transform({
      writableObjectMode: true,
      readableObjectMode: true,
      transform (chunk, encoding, callback) {
        const {
          date,
          duration,
          User: $user,
          description,
          Project: $project,
          EntryTags: $entryTags,
        } = chunk
        const row = [
          dayjs(date).format(exportDateFormat),
          dayjs.duration(duration * 60 * 1000).format(exportDurationFormat),
          $user.name,
          description,
          $project.name,
          $entryTags.map(({ Tag: { name } }) => name).join(' '),
        ]

        callback(null, row)
      }
    })

    const stringifier = stringify()
    stringifier.write([
      'Date',
      'Duration',
      'User',
      'Description',
      'Project',
      'Tags'
    ])

    const csvBuffers = []
    stringifier.on('data', (buf) => {
      csvBuffers.push(buf)
    })

    let csv
    let streamCompleteResolver
    const streamComplete =
      new Promise((resolve) => { streamCompleteResolver = resolve })

    stringifier.on('end', () => {
      csv = Buffer.concat(csvBuffers)
      streamCompleteResolver()
    })

    rows.pipe(docToArray)
    docToArray.pipe(stringifier)

    await streamComplete

    return csv.toString()
  }
)

module.exports = {
  Query: {
    EntryFilterAsCsvQ
  }
}
