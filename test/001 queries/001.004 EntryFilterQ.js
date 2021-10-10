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
    Tag,
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
    $projects: [ProjectI]
    $tags: [TagI]
    $users: [UserI]
    ) {
    EntryFilterQ(
      dateFrom: $dateFrom
      dateTo: $dateTo
      limit: $limit
      offset: $offset
      self: $self
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
  console.log('requested: ', tagIds)
  t.truthy(entries.every((e) => {
    const entryTagIds = e.tags.map(({ id }) => id)
    console.log('found: ', entryTagIds)
    return entryTagIds.some((id) => tagIds.includes(id))
  }))
})
