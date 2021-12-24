const gql = require('graphql-tag')

const Mutation = gql`
type Mutation {
  UserRegisterM(
    name: String!
    password: String!
    email: String!
  ): Tokens!
  UserLoginM(
    email: String!
    password: String!
  ): Tokens!
  UserRefreshM(
    refreshToken: String!
  ): Token!
  EntryCreateM(
    entry: EntryI!
  ): Entry!
  EntryUpdateM(
    entry: EntryI!
  ): Entry!
  TagUpdateM(
    tag: TagI
  ): Tag!
  ProjectUpdateM(
    project: ProjectI!
  ): Project!
  UserOptionM(
    exportDateFormat: String
    exportDurationFormat: String
  ): Options!
}
`

// const Mutation = gql`
// type Mutation {
//   UserRegisterM(
//     username: String!
//     password: String!
//     email: String!
//   ): Tokens!
//   UserLoginM(
//     email: String!
//     password: String!
//   ): Tokens!
//   UserRefreshM(
//     refreshToken: String!
//   ): Token!,
//   EntryUpsertM(
//     entry: EntryI!
//   ): Entry!
//   EntryDeleteM(
//     id: ObjectId!
//   ): Entry!
// }
// `

module.exports = {
  Mutation
}
