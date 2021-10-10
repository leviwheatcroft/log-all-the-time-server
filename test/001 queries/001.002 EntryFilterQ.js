/* ================================================================== fixture ==
rm db.sqlite && \
node test/dbAdmin/createUsers.js --name=test --count=12 && \
node test/dbAdmin/createEntries.js --count=256 && \
sqlite3 db.sqlite '.dump' > test/001\ queries/001.002.sql
*/
// require('dotenv-flow').config({ path: `${__dirname}/../../` })

const gql = require('graphql-tag')
const test = require('ava')

const {
  db: {
    sqlUp,
    Entry,
    Project,
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
    $order: OrderI
    $projects: [ProjectI]
    $tags: [TagI]
    $users: [UserI]
    ) {
    EntryFilterQ(
      dateFrom: $dateFrom
      dateTo: $dateTo
      limit: $limit
      offset: $offset
      order: $order
      tags: $tags
      projects: $projects
      users: $users
    ) {
    docs {
      ... on Entry {
        createdAt
        date
        description
        duration
        id
        project {
          id,
          name
        }
        tags {
          id
          name
        }
        user {
          id
          name
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
  const $user = await User.findOne()

  const result = await query({
    query: EntryFilterQ,
    variables: {
      users: [$user.toGql()]
    }
  })
  const { docs: entries } = result.data.EntryFilterQ
  t.truthy(entries.length > 0)
  t.truthy(entries.every((e) => e.user.id === $user.id))
  const totalDocs = await Entry.count()
  t.truthy(entries.length < totalDocs)
})

test.serial('EntryFilterQ no dates', async (t) => {
  const $user = await User.findOne()
  const count = await Entry.count({
    where: { UserId: $user.id }
  })
  const result = await query({
    query: EntryFilterQ,
    variables: {
      dateFrom: null,
      dateTo: null,
      users: [$user.toGql()],
      limit: 256
    }
  })
  const { docs: entries } = result.data.EntryFilterQ
  t.truthy(entries.length === count)
})

test.serial('EntryFilterQ project', async (t) => {
  const $project = await Project.findOne()
  const count = await Entry.count({
    where: { ProjectId: $project.id }
  })
  const result = await query({
    query: EntryFilterQ,
    variables: {
      projects: [$project.toGql()],
      limit: 256
    }
  })
  const { docs: entries } = result.data.EntryFilterQ
  t.truthy(entries.length === count)
})

test.serial('EntryFilterQ tags', async (t) => {
  const $entry = await Entry.findOne(Entry.withIncludes())

  const result = await query({
    query: EntryFilterQ,
    variables: {
      tags: $entry.EntryTags.map(($eT) => $eT.Tag.toGql())
    }
  })
  const {
    docs: entries
  } = result.data.EntryFilterQ

  const tagIds = $entry.EntryTags.map(($eT) => $eT.Tag.toGql().id)
  t.truthy(entries.every((e) => {
    const entryTagIds = e.tags.map(({ id }) => id)
    return entryTagIds.some((id) => tagIds.includes(id))
  }))
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

test.serial('EntryFilterQ sort by createdAt desc', async (t) => {
  const result = await query({
    query: EntryFilterQ,
    variables: {
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
