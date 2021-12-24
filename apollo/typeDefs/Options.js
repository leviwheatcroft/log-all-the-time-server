const gql = require('graphql-tag')

const Options = gql`
type Options {
  exportDateFormat: String!
  exportDurationFormat: String!
}
`

module.exports = {
  Options
}
