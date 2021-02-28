// https://janikvonrotz.ch/2019/12/05/apollo-graphql-integration-testing-in-practice/
require('dotenv-flow').config('../../')

const gql = require('graphql-tag')
const test = require('ava')

const {
  db: { createDb },
  apollo: { query }
} = require('../helpers')

test.before(async (t) => {
  await createDb('001 queries/001.001.archive')
})

const EntryQ = gql`
  query EntryQ($limit: Int) {
    EntryQ(limit: $limit) {
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

test.serial('EntryQ default limit', async (t) => {
  const result = await query({
    query: EntryQ,
    variables: {}
  })
  t.is(result.data.EntryQ.length, 20)
})
test.serial('EntryQ set limit', async (t) => {
  const result = await query({
    query: EntryQ,
    variables: {
      limit: 6
    }
  })
  t.is(result.data.EntryQ.length, 6)
})
