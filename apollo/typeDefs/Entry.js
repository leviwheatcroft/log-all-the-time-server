const gql = require('graphql-tag')

const Entry = gql`
type Entry {
  createdAt: Date!
  date: Date!
  active: Boolean
  description: String!
  duration: Int!
  id: Int
  tags: [Tag]
  project: Project!
  user: User!
}
`

module.exports = {
  Entry
}
