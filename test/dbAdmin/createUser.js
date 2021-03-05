require('dotenv-flow').config({ path: '../../' })
const yargsParser = require('yargs-parser')
const {
  createTestClient
} = require('apollo-server-testing')
const gql = require('graphql-tag')
const {
  mongooseConnect
} = require('../../db')
const {
  apolloListen
} = require('../../apollo')
const {
  _uniqueRandomWord
} = require('../helpers/randomWords')
const tml = require('../../lib/tml')

async function createUser (opts) {
  const {
    count = 1,
    username = false
  } = opts
  if (count > 1 && username)
    throw new RangeError('can only create 1 user if username is specified')
  const timer = new tml.Timer()
  tml.line()
  tml.bl('starting mongoose', process.env.MONGODB_URI)
  const db = await mongooseConnect()
  tml.bl('starting apollo')
  const { server } = await apolloListen({ includeMiddlewares: false })
  const { mutate } = createTestClient(server)

  const UserRegisterM = gql`
    mutation UserRegisterM(
        $username: String!
        $password: String!
        $email: String!
      ) {
      UserRegisterM(
        username: $username
        password: $password
        email: $email
      )
    }
  `

  const uniqueUserName = _uniqueRandomWord()
  for (let i = 0; i < count; i += 1) {
    const user = username || uniqueUserName.next().value
    await mutate({
      mutation: UserRegisterM,
      variables: {
        username: user,
        email: `${user}@email.com`,
        password: user
      }
    })
    tml.wh(`created: ${user}`)
  }

  tml.wh(`this op took: ${timer.elapsed()}`)

  tml.bl('stopping apollo & db')
  await server.stop()
  await db.disconnect()
  tml.bl('stopped')
}

if (require.main === module)
  createUser(yargsParser(process.argv.slice(2)))

module.exports = {
  createUser
}
