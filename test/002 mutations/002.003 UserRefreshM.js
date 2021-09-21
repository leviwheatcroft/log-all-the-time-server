/* ================================================================== fixture ==
see 002.002
*/

const check = require('check-types')
const gql = require('graphql-tag')
const test = require('ava')

const {
  db: { sqlUp, User },
  apollo: { mutate, setApolloContext }
} = require('../helpers')

test.before(async (t) => {
  await sqlUp('002 mutations/002.002.sql')
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

  await User.destroy({ where: { id: 1 } })

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
