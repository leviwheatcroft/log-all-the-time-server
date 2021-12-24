const gql = require('graphql-tag')

const User = gql`
type User {
  id: Int!
  name: String!
  gravatar: String!
  dialogs: [Dialog]!
  options: Options!
}
`

module.exports = {
  User
}
