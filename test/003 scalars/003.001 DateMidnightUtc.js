require('dotenv-flow').config('../../')

const gql = require('graphql-tag')
const test = require('ava')

const {
  db: { createDb },
  apollo: { query, setApolloContext }
} = require('../helpers')

test.before(async (t) => {
  await createDb()
})
test.beforeEach((t) => setApolloContext({ squelchErrors: true }))

const EntryFilterAsCsvQ = gql`
  query EntryFilterAsCsvQ(
    $limit: Int
    $dateFrom: DateMidnightUtc
    $dateTo: DateMidnightUtc
    $dateFormat: String
    $durationFormat: String
    $tags: [ObjectId]
  ) {
    EntryFilterAsCsvQ(
      limit: $limit
      dateFrom: $dateFrom
      dateTo: $dateTo
      dateFormat: $dateFormat
      durationFormat: $durationFormat
      tags: $tags
    )
  }
`

test.serial('DateMidnightUtc returns csv', async (t) => {
  const result = await query({
    query: EntryFilterAsCsvQ,
    variables: {
      dateFrom: '2021-02-28T00:00:00.001Z',
      dateTo: '2021-02-28T00:00:00.000Z'
    }
  })

  t.truthy(result.errors[0])
  const err = result.errors[0]

  t.is(err.code, 'MIDNIGHT_UTC_ERROR')
})
