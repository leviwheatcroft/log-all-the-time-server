/* ================================================================== fixture ==
rm db.sqlite
node test/dbAdmin/createEmpty.js
sqlite3 db.sqlite '.dump' > test/002\ mutations/002.001.sql
*/
// require('dotenv-flow').config({ path: `${__dirname}/../../` })

const gql = require('graphql-tag')
const test = require('ava')
const check = require('check-types')
const {
  db: {
    sqlUp,
    User,
    Team
  },
  apollo: { mutate, setApolloContext }
} = require('../helpers')

test.before(async (t) => {
  await sqlUp('002 mutations/002.001.sql')
})
test.beforeEach((t) => setApolloContext({ squelchErrors: true }))

const UserRegisterM = gql`
  mutation UserRegisterM(
    $name: String!
    $email: String!
    $password: String!
  ) {
    UserRegisterM(
      name: $name
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
      name: 'test',
      email: 'test@email.com',
      password: 'test'
    }
  })
  t.truthy(result.data.UserRegisterM)
  t.truthy(check.string(result.data.UserRegisterM.refreshToken))
  t.truthy(check.string(result.data.UserRegisterM.accessToken))
  const user = await User.findOne()
  t.truthy(user)
  t.is(user.active, true)
  t.is(user.name, 'test')
})

test.serial('UserRegisterM email collision', async (t) => {
  const result = await mutate({
    mutation: UserRegisterM,
    variables: {
      name: 'test2',
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
      name: 'test2',
      email: 'test@email.com',
      password: 'test'
    }
  })
  t.truthy(result.data.UserRegisterM)
  const users = await User.findAll()
  t.is(users.length, 1)
})

test.serial('UserRegisterM create team', async (t) => {
  const team = await Team.findOne()
  t.truthy(team)
})

test.serial('UserRegisterM store hashed password', async (t) => {
  const user = await User.findOne()
  t.regex(user.password, /^\$2[aby]?\$[\d]+\$[./A-Za-z0-9]{53}$/)
})

test.serial('UserRegisterM gravatar', async (t) => {
  const user = await User.findOne()
  t.regex(user.gravatar, /gravatar.*retro/)
})
