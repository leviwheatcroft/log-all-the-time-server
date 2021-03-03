const gql = require('graphql-tag')
const test = require('ava')

const {
  db: { createDb },
  apollo: { query, setApolloContext }
} = require('../helpers')

test.before(async (t) => {
  await createDb()
})

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
  setApolloContext({ squelchErrors: true })
  const result = await query({
    query: EntryFilterAsCsvQ,
    variables: {
      dateFrom: '2021-02-28T00:00:00.001Z',
      dateTo: '2021-02-28T00:00:00.000Z'
    }
  })

  t.is(result.errors[0].extensions.code, 'MIDNIGHT_UTC_ERROR')
  setApolloContext({ squelchErrors: false })
})
