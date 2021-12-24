const gql = require('graphql-tag')

const Scalars = gql`
scalar Date
scalar DateMidnightUtc
scalar Option
scalar KeyValue
`

module.exports = {
  Scalars
}
