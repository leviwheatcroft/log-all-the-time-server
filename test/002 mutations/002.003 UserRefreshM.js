/* ================================================================== fixture ==
node purge.js --uri="mongodb://timelog:timelog@localhost:27017/timelog" --yesReally
node createUser.js --username=test
mongodump \
  --uri="mongodb://timelog:timelog@localhost:27017/timelog" \
  --archive \
  > ./002.002.archive
*/

require('dotenv-flow').config('../../')

const check = require('check-types')
const gql = require('graphql-tag')
const test = require('ava')

const {
  db: { createDb, User, Team },
  apollo: { mutate, setApolloContext }
} = require('../helpers')

test.before(async (t) => {
  await createDb('002 mutations/002.002.archive')
})
test.beforeEach((t) => setApolloContext({ squelchErrors: true }))

const UserLoginM = gql`
  mutation UserLoginM(
    $password: String!
    $email: String!
  ) {
    UserLoginM(
      password: $password
      email: $email
    ) {
      accessToken,
      refreshToken
    }
  }
`

const UserRefreshM = gql`
  mutation UserRefreshM(
    $refreshToken: String!
  ) {
    UserRefreshM(
      refreshToken: $refreshToken
    )
  }
`

test.serial('UserRefreshM refresh', async (t) => {
  setApolloContext({ squelchErrors: false })
  const result = await mutate({
    mutation: UserLoginM,
    variables: {
      email: 'test@email.com',
      password: 'test'
    }
  })
  const {
    refreshToken
  } = result.data.UserLoginM

  const resultRefresh = await mutate({
    mutation: UserRefreshM,
    variables: {
      refreshToken
    }
  })
  const {
    data: { UserRefreshM: refresh }
  } = resultRefresh
  t.truthy(check.string(refresh))
})
test.serial('UserRefreshM bad user', async (t) => {
  const result = await mutate({
    mutation: UserLoginM,
    variables: {
      email: 'test@email.com',
      password: 'test'
    }
  })
  const {
    refreshToken
  } = result.data.UserLoginM

  await User.deleteMany({})

  const resultRefresh = await mutate({
    mutation: UserRefreshM,
    variables: {
      refreshToken
    }
  })
  t.truthy(resultRefresh.errors[0])
  const err = resultRefresh.errors[0]
  t.is(err.code, 'AUTH_INACTIVE_USER')
})
