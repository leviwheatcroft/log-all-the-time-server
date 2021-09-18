const dotEnvFlow = require('dotenv-flow')

dotEnvFlow.config({ path: `${__dirname}/../../` })
dotEnvFlow.load(`${__dirname}/../../.env.sqlite`)

const yargsParser = require('yargs-parser')
const {
  createTestClient
} = require('apollo-server-testing')
const gql = require('graphql-tag')
const {
  sqlInitialised
} = require('../../db')
const {
  apolloListen
} = require('../../apollo')
const {
  _uniqueRandomWord
} = require('../helpers/randomWords')
const pc = require('../../lib/prettyConsole')

async function createUser (opts) {
  const {
    count = 1,
    username = false
  } = opts
  const timer = new pc.Timer()
  pc.line()
  const sql = await sqlInitialised
  pc.bl('starting apollo')
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
      ) {
        refreshToken
        accessToken
      }
    }
  `

  const uniqueUserName = _uniqueRandomWord(username)
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
    pc.wh(`created: ${user}`)
  }

  pc.wh(`this op took: ${timer.elapsed()}`)

  pc.bl('stopping apollo & db')
  await server.stop()
  await sql.close()
  pc.bl('stopped')
}

if (require.main === module)
  createUser(yargsParser(process.argv.slice(2)))

module.exports = {
  createUser
}
