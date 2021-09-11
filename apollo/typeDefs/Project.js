const gql = require('graphql-tag')

const Project = gql`
type Project {
  id: Int!
  projectName: String!
  archived: Boolean
}
`

module.exports = {
  Project
}
