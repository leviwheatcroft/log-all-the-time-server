const gql = require('graphql-tag')

const ProjectI = gql`
input ProjectI {
  id: Int
  name: String!
  archived: Boolean
  teamId: Int
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
`

module.exports = {
  ProjectI
}
