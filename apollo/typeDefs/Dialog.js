const gql = require('graphql-tag')

const Dialog = gql`
type Dialog {
  key: String!
  hidden: Boolean!
}
`

module.exports = {
  Dialog
}
