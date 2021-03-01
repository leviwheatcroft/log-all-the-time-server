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
    tags: [ObjectId]
  ): [Entry]!
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
  DurationByDayQ(
    dateFrom: Date!
    dateTo: Date!
  ): [Duration]!
}
`

module.exports = {
  Query
}
