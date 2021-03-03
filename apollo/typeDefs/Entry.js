const gql = require('graphql-tag')

const Entry = gql`
type Entry {
  id: ObjectId
  user: User!
  description: String!
  date: Date!
  duration: Int!
  deleted: Boolean
  tags: [Tag]
}
`

module.exports = {
  Entry
}
