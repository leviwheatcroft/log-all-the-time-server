const gql = require('graphql-tag')

const Page = gql`
  type Page {
    docs: [Entry]!
    hasMore: Boolean!
  }
`

module.exports = {
  Page
}
