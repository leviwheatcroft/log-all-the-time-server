const gql = require('graphql-tag')

const Scalars = gql`
scalar Date
scalar DateMidnightUtc
`

module.exports = {
  Scalars
}
