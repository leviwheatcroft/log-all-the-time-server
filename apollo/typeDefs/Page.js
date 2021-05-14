const gql = require('graphql-tag')

const Page = gql`
  type Page {
    docs: [Doc]!
    hasMore: Boolean!
  }
`

module.exports = {
  Page
}
