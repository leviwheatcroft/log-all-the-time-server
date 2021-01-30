const gql = require('graphql-tag')

const Mutation = gql`
type Mutation {
  UserRegisterM(
    password: String!
    email: String!
  ): Boolean
  UserLoginM(
    email: String!
    password: String!
  ): Tokens!
  UserRefreshM(
    email: String!
  ): Tokens!
}
`

module.exports = {
  Mutation
}
