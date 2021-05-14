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
  db: { createDb, Entry, User },
  apollo: { query, setApolloContext }
} = require('../helpers')

test.before(async (t) => {
  await createDb('001 queries/001.002.archive')
  const user = await User.findOne()
  setApolloContext({ user })
  t.context.user = user
})

const EntryFilterQ = gql`
  query EntryFilterQ(
    $dateFrom: DateMidnightUtc
    $dateTo: DateMidnightUtc
    $limit: Int
    $offset: Int
    $self: Boolean
    $sort: SortI
    $tags: [ObjectId!]
    $users: [ObjectId!]
  ) {
    EntryFilterQ(
      dateFrom: $dateFrom
      dateTo: $dateTo
      limit: $limit
      offset: $offset
      self: $self
      sort: $sort
      tags: $tags
      users: $users
    ) {
      docs {
        ... on Entry {
          createdAt
          date
          description
          duration
          id
          tags {
            id
            tagName
          }
          user {
            id
            username
          }
        }
      }
      hasMore
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
  const { docs: entries } = result.data.EntryFilterQ
  // console.log(entries)
  t.truthy(entries.length)
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
  const { docs: entries } = result.data.EntryFilterQ
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

test.serial('EntryFilterQ no dates', async (t) => {
  const {
    user: { id }
  } = await Entry.findOne({}, null, { populate: 'user' })
  const count = await Entry.countDocuments({
    user: id
  })
  const result = await query({
    query: EntryFilterQ,
    variables: {
      dateFrom: null,
      dateTo: null,
      users: [id],
      limit: 256
    }
  })
  const { docs: entries } = result.data.EntryFilterQ
  t.truthy(entries.length === count)
})

test.serial('EntryFilterQ paging', async (t) => {
  let result = await query({
    query: EntryFilterQ,
    variables: {
      limit: 24
    }
  })
  const { docs: all24 } = result.data.EntryFilterQ
  result = await query({
    query: EntryFilterQ,
    variables: {
      offset: 0,
      limit: 12
    }
  })
  const { docs: first12 } = result.data.EntryFilterQ
  result = await query({
    query: EntryFilterQ,
    variables: {
      offset: 12,
      limit: 12
    }
  })
  const { docs: last12 } = result.data.EntryFilterQ

  t.truthy(first12.every((e, i) => e.id === all24[i].id))
  t.truthy(last12.every((e, i) => e.id === all24[i + 12].id))
})
test.serial('EntryFilterQ self', async (t) => {
  const result = await query({
    query: EntryFilterQ,
    variables: {
      self: true
    }
  })
  const {
    docs: entries
  } = result.data.EntryFilterQ
  t.truthy(entries.every((e) => e.user.id === t.context.user.id))
})
test.serial('EntryFilterQ sort by createdAt desc', async (t) => {
  const result = await query({
    query: EntryFilterQ,
    variables: {
      self: true,
      sort: { createdAt: 'desc' }
    }
  })
  const {
    docs: entries
  } = result.data.EntryFilterQ
  let lastCreatedAt = Date.now()
  t.truthy(entries.every((e) => {
    if (lastCreatedAt < e.createdAt)
      return false
    lastCreatedAt = e.createdAt
    return true
  }))
})
test.serial('EntryFilterQ sort by createdAt asc', async (t) => {
  const result = await query({
    query: EntryFilterQ,
    variables: {
      self: true,
      sort: { createdAt: 'asc' }
    }
  })
  const {
    docs: entries
  } = result.data.EntryFilterQ
  let lastCreatedAt = 0
  t.truthy(entries.every((e) => {
    if (lastCreatedAt > e.createdAt)
      return false
    lastCreatedAt = e.createdAt
    return true
  }))
})
test.serial('EntryFilterQ sort by date desc', async (t) => {
  const result = await query({
    query: EntryFilterQ,
    variables: {
      self: true,
      sort: { date: 'desc' }
    }
  })
  const {
    docs: entries
  } = result.data.EntryFilterQ
  let lastDate = Date.now()
  t.truthy(entries.every((e) => {
    if (lastDate < e.date)
      return false
    lastDate = e.date
    return true
  }))
})
test.serial('EntryFilterQ sort by date asc', async (t) => {
  const result = await query({
    query: EntryFilterQ,
    variables: {
      self: true,
      sort: { date: 'asc' }
    }
  })
  const {
    docs: entries
  } = result.data.EntryFilterQ
  let lastDate = 0
  t.truthy(entries.every((e) => {
    if (lastDate > e.date)
      return false
    lastDate = e.date
    return true
  }))
})
