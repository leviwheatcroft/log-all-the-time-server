// https://janikvonrotz.ch/2019/12/05/apollo-graphql-integration-testing-in-practice/
require('dotenv-flow').config('../../')

const gql = require('graphql-tag')
const test = require('ava')
// const {
//   User,
//   Team
// } = require('../helpers/db')
const check = require('check-types')
const {
  db: { createDb, User, Team },
  apollo: { mutate, setApolloContext }
} = require('../helpers')

test.before(async (t) => {
  await createDb()
})
test.beforeEach((t) => setApolloContext({ squelchErrors: true }))

const UserRegisterM = gql`
  mutation UserRegisterM(
    $username: String!
    $email: String!
    $password: String!
  ) {
    UserRegisterM(
      username: $username
      email: $email
      password: $password
    ) {
      accessToken
      refreshToken
    }
  }
`

test.serial('UserRegisterM create new user', async (t) => {
  const result = await mutate({
    mutation: UserRegisterM,
    variables: {
      username: 'test',
      email: 'test@email.com',
      password: 'test'
    }
  })
  t.truthy(result.data.UserRegisterM)
  t.truthy(check.string(result.data.UserRegisterM.refreshToken))
  t.truthy(check.string(result.data.UserRegisterM.accessToken))
  const users = await User.find()
  t.is(users.length, 1)
  t.is(users[0].active, true)
  t.is(users[0].username, 'test')
  const team = await Team.findOne()
  t.truthy(team)
})
test.serial('UserRegisterM email collision', async (t) => {
  const result = await mutate({
    mutation: UserRegisterM,
    variables: {
      username: 'test2',
      email: 'test@email.com',
      password: 'test'
    }
  })
  t.truthy(result.errors[0])
  const err = result.errors[0]
  t.is(err.code, 'NEW_USER_ERROR')
})
test.serial('UserRegisterM reactivate user', async (t) => {
  const user = await User.findOne()
  user.active = false
  await user.save()
  const result = await mutate({
    mutation: UserRegisterM,
    variables: {
      username: 'test2',
      email: 'test@email.com',
      password: 'test'
    }
  })
  t.truthy(result.data.UserRegisterM)
  const users = await User.find()
  t.is(users.length, 1)
})
