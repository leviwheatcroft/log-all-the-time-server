const gql = require('graphql-tag')

const Query = gql`
type Query {
  UserQ: User!
  EntryQ: [Entry]!
}
`

module.exports = {
  Query
}
