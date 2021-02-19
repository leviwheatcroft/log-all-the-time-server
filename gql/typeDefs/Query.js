const gql = require('graphql-tag')

const Query = gql`
type Query {
  UserQ: User!
  EntryQ(
    limit: Int
  ): [Entry]!
  EntryFilterQ(
    limit: Int
    dateFrom: Date
    dateTo: Date
    tags: String
  ): [Entry]!
  TagPartialQ(
    tagPartial: String
  ): [Tag]!
}
`

module.exports = {
  Query
}
