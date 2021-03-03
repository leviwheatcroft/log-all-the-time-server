const gql = require('graphql-tag')

const User = gql`
type User {
  _id: ObjectId!
  username: String!
}
`

module.exports = {
  User
}
