const gql = require('graphql-tag')

const SortI = gql`
input SortI {
  createdAt: String
  date: String
}
`

module.exports = {
  SortI
}
