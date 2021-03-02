const gql = require('graphql-tag')

const Entry = gql`
type Entry {
  id: ObjectId
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
