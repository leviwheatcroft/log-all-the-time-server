const gql = require('graphql-tag')

const Tag = gql`
type Tag {
  id: Int!
  tagName: String!
  archived: Boolean
}
`

module.exports = {
  Tag
}
