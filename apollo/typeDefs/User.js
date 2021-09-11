const gql = require('graphql-tag')

const User = gql`
type User {
  id: Int!
  username: String!
}
`

module.exports = {
  User
}
