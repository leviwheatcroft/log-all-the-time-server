/* ================================================================== fixture ==
see 001.002
*/

const gql = require('graphql-tag')
const test = require('ava')

const {
  db: {
    sqlUp,
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

const EntryFilterAsCsvQ = gql`
  query EntryFilterAsCsvQ(
    $dateFrom: DateMidnightUtc
    $dateTo: DateMidnightUtc
    $projects: [ProjectI]
    $tags: [TagI]
    $users: [UserI]
    $limit: Int
    $order: OrderI
    ) {
    EntryFilterAsCsvQ(
      dateFrom: $dateFrom
      dateTo: $dateTo
      projects: $projects
      tags: $tags
      users: $users
      limit: $limit
      order: $order
    )
  }
`

test.serial('EntryFilterQ basic', async (t) => {
  const result = await query({
    query: EntryFilterAsCsvQ,
    variables: {}
  })
  const csv = result.data.EntryFilterAsCsvQ

  // console.log(csv.split(/\n/).length)
  // console.log(csv.split(/\n/)[0].split(/,/).length)
  const rows = csv.split(/\n/)
  t.truthy(rows.slice(0, 12).every((r) => r.split(/,/).length === 6))
  // t.truthy(false)
})
