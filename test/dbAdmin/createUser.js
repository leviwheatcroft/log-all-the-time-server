require('dotenv-flow').config({ path: '../../' })
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

async function createUser () {
  const timer = new tml.Timer()
  tml.line()
  tml.bl('starting mongoose', process.env.MONGODB_URI)
  const db = await mongooseConnect()
  tml.bl('starting apollo')
  const { server } = await apolloListen({ includeMiddlewares: false })
  const { mutate } = createTestClient(server)
  const count = process.argv[2] || 1

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
    const user = uniqueUserName.next().value
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

createUser()
