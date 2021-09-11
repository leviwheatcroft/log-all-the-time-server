const gql = require('graphql-tag')

const ProjectI = gql`
input ProjectI {
  id: Int
  projectName: String!
}
`

module.exports = {
  ProjectI
}
