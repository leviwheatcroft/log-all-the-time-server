/* ================================================================== fixture ==
rm db.sqlite && \
node test/dbAdmin/createUsers.js --name=test && \
sqlite3 db.sqlite '.dump' > test/002\ mutations/002.002.sql
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

test.serial('UserLoginM log in', async (t) => {
  const result = await mutate({
    mutation: UserLoginM,
    variables: {
      email: 'test@email.com',
      password: 'test'
    }
  })
  t.truthy(result.data.UserLoginM)
  t.truthy(check.string(result.data.UserLoginM.refreshToken))
  t.truthy(check.string(result.data.UserLoginM.accessToken))
})
test.serial('UserLoginM bad email', async (t) => {
  const result = await mutate({
    mutation: UserLoginM,
    variables: {
      email: 'test1@email.com',
      password: 'test'
    }
  })
  t.truthy(result.errors[0])
  const err = result.errors[0]
  t.is(err.code, 'AUTH_BAD_EMAIL')
})
test.serial('UserLoginM bad password', async (t) => {
  const result = await mutate({
    mutation: UserLoginM,
    variables: {
      email: 'test@email.com',
      password: 'test1'
    }
  })
  t.truthy(result.errors[0])
  const err = result.errors[0]
  t.is(err.code, 'AUTH_BAD_PASSWORD')
})
test.serial('UserLoginM inactive user', async (t) => {
  const user = await User.findOne()
  user.active = false
  await user.save()
  const result = await mutate({
    mutation: UserLoginM,
    variables: {
      email: 'test@email.com',
      password: 'test'
    }
  })
  t.truthy(result.errors[0])
  const err = result.errors[0]
  t.is(err.code, 'AUTH_INACTIVE_USER')
})
