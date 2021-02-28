// https://janikvonrotz.ch/2019/12/05/apollo-graphql-integration-testing-in-practice/
require('dotenv-flow').config('../../')

const gql = require('graphql-tag')
const test = require('ava')

const {
  db: { createDb },
  apollo: { query }
} = require('../helpers')

test.before(async (t) => {
  await createDb('001 resolvers/001.002.archive')
})

const EntryFilterQ = gql`
  query EntryFilterQ(
    $limit: Int
    $dateFrom: Date
    $dateTo: Date
    $tags: [ObjectId]
  ) {
    EntryFilterQ(
      limit: $limit
      dateFrom: $dateFrom
      dateTo: $dateTo
      tags: $tags
    ) {
      id
      description
      date
      duration
      tags {
        id
        tagName
      }
    }
  }
`

test.serial('EntryFilterQ 1', async (t) => {
  const result = await query({
    query: EntryFilterQ,
    variables: {
      dateFrom: '2021-02-28T00:00:00.000Z',
      dateTo: '2021-02-28T00:00:00.000Z'
    }
  })
  t.is(result.data.EntryFilterQ.length, 14)
})
