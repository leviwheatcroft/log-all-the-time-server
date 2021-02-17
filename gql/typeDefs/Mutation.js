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
  EntryUpsertM(
    entry: EntryI!
  ): Entry!
}
`

module.exports = {
  Mutation
}
