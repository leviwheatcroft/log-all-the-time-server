const gql = require('graphql-tag')

const UserI = gql`
input UserI {
  id: Int
  name: String!
  gravatar: String
}
`

module.exports = {
  UserI
}
