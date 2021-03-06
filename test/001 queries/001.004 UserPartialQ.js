/* ================================================================== fixture ==
node purge.js --uri="mongodb://timelog:timelog@localhost:27017/timelog" --yesReally
node createUser.js --count=128
mongodump \
  --uri="mongodb://timelog:timelog@localhost:27017/timelog" \
  --archive \
  > ./001.004.archive
*/

require('dotenv-flow').config('../../')

// const check = require('check-types')
const gql = require('graphql-tag')
const test = require('ava')

const {
  // db: { createDb, User, Team },
  db: { createDb },
  apollo: { query, setApolloContext }
} = require('../helpers')

test.before(async (t) => {
  await createDb('001 queries/001.004.archive')
})
test.beforeEach((t) => setApolloContext({ squelchErrors: true }))

const UserPartialQ = gql`
  query UserPartialQ(
    $userPartial: String
  ) {
    UserPartialQ(
      userPartial: $userPartial
    ) {
      id
      username
    }
  }
`

test.serial('UserPartialQ fetch users', async (t) => {
  const result = await query({
    query: UserPartialQ,
    variables: {
      userPartial: 'di'
    }
  })

  t.is(result.data.UserPartialQ.length, 11)
})
test.todo('limit results to user\'s team')
