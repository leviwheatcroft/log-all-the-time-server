const gql = require('graphql-tag')

const TagI = gql`
input TagI {
  id: Int
  tagName: String!
}
`

module.exports = {
  TagI
}
