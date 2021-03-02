/* eslint-disable no-console */
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

async function createUser () {
  console.log('starting mongoose', process.env.MONGODB_URI)
  const db = await mongooseConnect()
  console.log('starting apollo')
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
  const result = await mutate({
    mutation: UserRegisterM,
    variables: {
      username: 'test',
      email: 'test@email.com',
      password: 'test'
    }
  })
  console.log(result)

  console.log('stopping apollo & db')
  await server.stop()
  await db.disconnect()
  console.log('stopped')
}

createUser()
