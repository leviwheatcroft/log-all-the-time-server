/* ================================================================== fixture ==
node purge.js --uri="mongodb://timelog:timelog@localhost:27017/timelog" --yesReally
node createUsers.js
node createEntries.js --count=64 --tagSetCount=64
mongodump \
  --uri="mongodb://timelog:timelog@localhost:27017/timelog" \
  --archive \
  > ./001.005.archive
*/

require('dotenv-flow').config('../../')

// const check = require('check-types')
const gql = require('graphql-tag')
const test = require('ava')

const {
  // db: { createDb, User, Team },
  db: { createDb, User },
  apollo: { query, setApolloContext }
} = require('../helpers')

test.before(async (t) => {
  await createDb('001 queries/001.005.archive')
  const user = await User.findOne()
  // console.log(user)
  t.context.user = user
  setApolloContext({ user })
})
test.beforeEach((t) => setApolloContext({ squelchErrors: true }))

const TagQ = gql`
  query TagQ(
    $offset: Int
    $limit: Int
    $showArchived: Boolean
  ) {
    TagQ(
      offset: $offset
      limit: $limit
      showArchived: $showArchived
    ) {
      docs {
        ... on Tag {
          tagName,
          archived
        }
      }
      hasMore
    }
  }
`

test.serial('TagQ 1', async (t) => {
  const result = await query({
    query: TagQ
  })
  // console.log(result)

  t.is(result.data.TagQ.docs.length, 20)
})
