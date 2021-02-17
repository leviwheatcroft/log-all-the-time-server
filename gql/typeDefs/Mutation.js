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
    refreshToken: String!
  ): Token!,
  EntryUpdateM(
    entry: EntryI!
  ): Entry!
  EntryAddM(
    entry: EntryI!
  ): Entry!
}
`

module.exports = {
  Mutation
}
