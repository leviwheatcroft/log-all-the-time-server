const gql = require('graphql-tag')

const Project = gql`
type Project {
  id: Int!
  name: String!
  archived: Boolean
}
`

module.exports = {
  Project
}
