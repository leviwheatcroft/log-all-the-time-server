const gql = require('graphql-tag')

const User = gql`
type User {
  id: Int!
  username: String!
  gravatar: String!
}
`

module.exports = {
  User
}
