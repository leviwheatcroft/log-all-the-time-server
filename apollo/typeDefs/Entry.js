const gql = require('graphql-tag')

const Entry = gql`
type Entry {
  id: Int!
  date: Date!
  description: String!
  duration: Int!
  tags: [Tag]
  project: Project!
  user: User!
  createdAt: Date!
}
`

module.exports = {
  Entry
}
