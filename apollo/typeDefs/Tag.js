const gql = require('graphql-tag')

const Tag = gql`
type Tag {
  id: Int!
  name: String!
  archived: Boolean
}
`

module.exports = {
  Tag
}
