const gql = require('graphql-tag')

const Query = gql`
type Query {
  UserQ: User!
  EntryQ(
    limit: Int
  ): [Entry]!
  EntryFilterQ(
    offset: Int
    limit: Int
    dateFrom: DateMidnightUtc
    dateTo: DateMidnightUtc
    tags: [ObjectId!]
    users: [ObjectId!]
  ): Page
  EntryFilterAsCsvQ(
    limit: Int
    dateFrom: DateMidnightUtc
    dateTo: DateMidnightUtc
    tags: [ObjectId]
    dateFormat: String
    durationFormat: String
  ): String!
  TagPartialQ(
    tagPartial: String
  ): [Tag]!
  UserPartialQ(
    userPartial: String
  ): [User]!
  DurationByDayQ(
    dateFrom: Date!
    dateTo: Date!
  ): [Duration]!
}
`

module.exports = {
  Query
}
