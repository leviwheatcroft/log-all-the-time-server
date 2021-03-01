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

test.serial('EntryFilterAsCsvQ returns csv', async (t) => {
  const result = await query({
    query: EntryFilterAsCsvQ,
    variables: {
      dateFrom: '2021-02-28T00:00:00.000Z',
      dateTo: '2021-02-28T00:00:00.000Z'
    }
  })
  t.is(result.data.EntryFilterAsCsvQ.split('\n').length, 16)
})

test.serial('EntryFilterAsCsvQ dateFormat', async (t) => {
  const result = await query({
    query: EntryFilterAsCsvQ,
    variables: {
      dateFrom: '2021-02-28T00:00:00.000Z',
      dateTo: '2021-02-28T00:00:00.000Z',
      dateFormat: 'MM-DD-YY'
    }
  })

  let {
    data: { EntryFilterAsCsvQ: entries }
  } = result

  entries = entries.split('\n').slice(1, 10)
  t.true(entries.every((e) => /02-28-21/.test(e)))
})

test.serial('EntryFilterAsCsvQ timeFormat', async (t) => {
  const result = await query({
    query: EntryFilterAsCsvQ,
    variables: {
      dateFrom: '2021-02-28T00:00:00.000Z',
      dateTo: '2021-02-28T00:00:00.000Z',
      durationFormat: 'HH:mm:ss.SSS'
    }
  })

  let {
    data: { EntryFilterAsCsvQ: entries }
  } = result

  entries = entries.split('\n').slice(1, 10)
  t.true(entries.every((e) => /\d{2}:\d{2}:00\.000/.test(e)))
})
