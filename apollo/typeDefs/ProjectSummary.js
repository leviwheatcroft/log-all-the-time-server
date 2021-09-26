const gql = require('graphql-tag')

const ProjectSummary = gql`
type ProjectSummary {
  id: String!
  projectName: String!
  projectDuration: Int!
  portion: Float!
}
`

module.exports = {
  ProjectSummary
}
