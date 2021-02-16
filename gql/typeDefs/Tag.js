const gql = require('graphql-tag')

const Tag = gql`
type Tag {
  id: ObjectId
  tag: String
}
`

module.exports = {
  Tag
}
