const gql = require('graphql-tag')

const Scalars = gql`
scalar Date
scalar DateMidnightUtc
scalar ObjectId
`

module.exports = {
  Scalars
}
