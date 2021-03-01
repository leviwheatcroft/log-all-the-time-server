// https://janikvonrotz.ch/2019/12/05/apollo-graphql-integration-testing-in-practice/
require('dotenv-flow').config('../../')

const gql = require('graphql-tag')
const test = require('ava')

const {
  db: { createDb },
  apollo: { query }
} = require('../helpers')

test.before(async (t) => {
  await createDb('001 queries/001.003.archive')
})

const EntryFilterAsCsvQ = gql`
  query EntryFilterAsCsvQ(
    $limit: Int
    $dateFrom: Date
    $dateTo: Date
    $tags: [ObjectId]
  ) {
    EntryFilterAsCsvQ(
      limit: $limit
      dateFrom: $dateFrom
      dateTo: $dateTo
      tags: $tags
    )
  }
`

test.serial('EntryFilterAsCsvQ 1', async (t) => {
  const result = await query({
    query: EntryFilterAsCsvQ,
    variables: {
      dateFrom: '2021-02-28T00:00:00.000Z',
      dateTo: '2021-02-28T00:00:00.000Z'
    }
  })
  t.is(result.data.EntryFilterAsCsvQ.length, 1058)
})
