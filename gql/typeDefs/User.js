const gql = require('graphql-tag')

const User = gql`
type User {
  _id: ObjectId!
  username: String!
  email: String!
}
`

module.exports = {
  User
}
