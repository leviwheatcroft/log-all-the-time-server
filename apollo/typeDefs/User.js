const gql = require('graphql-tag')

const User = gql`
type User {
  id: ObjectId!
  username: String!
}
`

module.exports = {
  User
}
