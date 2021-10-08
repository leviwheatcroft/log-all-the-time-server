const gql = require('graphql-tag')

const TagI = gql`
input TagI {
  id: Int
  name: String!
  archived: Boolean
  teamId: Int
  createdAt: Date
  updatedAt: Date
}
`

module.exports = {
  TagI
}
