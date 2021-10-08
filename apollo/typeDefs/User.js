const gql = require('graphql-tag')

const User = gql`
type User {
  id: Int!
  name: String!
  gravatar: String!
}
`

module.exports = {
  User
}
