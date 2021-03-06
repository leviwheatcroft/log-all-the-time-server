/* ================================================================== fixture ==
node purge.js --uri="mongodb://timelog:timelog@localhost:27017/timelog" --yesReally
node createUsers.js --username=test --count=12
node createEntries.js --count=256
mongodump \
  --uri="mongodb://timelog:timelog@localhost:27017/timelog" \
  --archive \
  > ./001.002.archive
*/
require('dotenv-flow').config('../../')

const gql = require('graphql-tag')
const test = require('ava')

const {
  db: { createDb, Entry },
  apollo: { query }
} = require('../helpers')

test.before(async (t) => {
  await createDb('001 queries/001.002.archive')
})

const EntryFilterQ = gql`
  query EntryFilterQ(
    $limit: Int
    $dateFrom: DateMidnightUtc
    $dateTo: DateMidnightUtc
    $tags: [ObjectId]
    $users: [ObjectId]
  ) {
    EntryFilterQ(
      limit: $limit
      dateFrom: $dateFrom
      dateTo: $dateTo
      tags: $tags
      users: $users
    ) {
      id
      description
      user {
        id
        username
      }
      date
      duration
      tags {
        id
        tagName
      }
    }
  }
`

test.serial('EntryFilterQ filter for single day', async (t) => {
  const {
    date
  } = await Entry.findOne()

  const result = await query({
    query: EntryFilterQ,
    variables: {
      dateFrom: date.toISOString(),
      dateTo: date.toISOString()
    }
  })
  const entries = result.data.EntryFilterQ
  t.truthy(entries.every(({ date: _d }) => _d.valueOf() === date.valueOf()))
})
test.serial('EntryFilterQ filter by user', async (t) => {
  const {
    user: { id }
  } = await Entry.findOne({}, null, { populate: 'user' })

  const result = await query({
    query: EntryFilterQ,
    variables: {
      users: [id]
    }
  })
  const entries = result.data.EntryFilterQ
  t.truthy(entries.length > 0)
  const allMatch = entries.every((entry) => {
    const {
      user: { id: _id }
    } = entry
    return _id === id
  })
  t.truthy(allMatch)
  const totalDocs = await Entry.estimatedDocumentCount()
  t.truthy(entries.length < totalDocs)
})
