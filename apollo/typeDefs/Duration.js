const gql = require('graphql-tag')

const Duration = gql`
type Duration {
  id: Date!
  duration: Int!
}
`

module.exports = {
  Duration
}
