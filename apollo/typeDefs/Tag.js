const gql = require('graphql-tag')

const Tag = gql`
type Tag {
  id: ObjectId!
  tagName: String!
  archived: Boolean
}
`

module.exports = {
  Tag
}
