const gql = require('graphql-tag')

const TagI = gql`
input TagI {
  id: ObjectId
  tagName: String!
}
`

module.exports = {
  TagI
}
