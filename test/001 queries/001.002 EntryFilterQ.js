/* ================================================================== fixture ==
rm db.sqlite
node test/dbAdmin/createUsers.js --username=test --count=12
node test/dbAdmin/createEntries.js --count=256
sqlite3 db.sqlite '.dump' > test/001\ queries/001.002.sql
*/
// require('dotenv-flow').config({ path: `${__dirname}/../../` })

const gql = require('graphql-tag')
const test = require('ava')

const {
  db: {
    sqlUp,
    Entry,
    User
  },
  apollo: { query, setApolloContext }
} = require('../helpers')

test.before(async (t) => {
  await sqlUp('001 queries/001.002.sql')
  const user = await User.findOne({
    raw: true
  })

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
    $order: OrderI
    $tags: [Int!]
    $users: [Int!]
  ) {
    EntryFilterQ(
      dateFrom: $dateFrom
      dateTo: $dateTo
      limit: $limit
      offset: $offset
      self: $self
      order: $order
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

  t.truthy(entries.length)
  t.truthy(entries.every(({ date: _d }) => _d.valueOf() === date.valueOf()))
})

test.serial('EntryFilterQ filter by user', async (t) => {
  const {
    UserId
  } = await Entry.findOne()

  const result = await query({
    query: EntryFilterQ,
    variables: {
      users: [UserId]
    }
  })
  const { docs: entries } = result.data.EntryFilterQ
  t.truthy(entries.length > 0)
  t.truthy(entries.every((e) => e.user.id === UserId))
  const totalDocs = await Entry.count()
  t.truthy(entries.length < totalDocs)
})

test.serial('EntryFilterQ no dates', async (t) => {
  const {
    UserId
  } = await Entry.findOne()
  const count = await Entry.count({
    where: { UserId }
  })
  const result = await query({
    query: EntryFilterQ,
    variables: {
      dateFrom: null,
      dateTo: null,
      users: [UserId],
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
      order: { createdAt: 'desc' }
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
      order: { createdAt: 'asc' }
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
      order: { date: 'desc' }
    }
  })
  const {
    docs: entries
  } = result.data.EntryFilterQ
  let lastDate = Infinity
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
      order: { date: 'asc' }
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
