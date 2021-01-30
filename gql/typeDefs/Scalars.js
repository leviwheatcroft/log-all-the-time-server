const gql = require('graphql-tag')

const Scalars = gql`
scalar Date
scalar ObjectId
`

module.exports = {
  Scalars
}
