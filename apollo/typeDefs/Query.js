const gql = require('graphql-tag')

const Query = gql`
type Query {
  SelfQ: User!
}
`

// const Query = gql`
// type Query {
//   UserQ: User!
//   EntryQ(
//     limit: Int
//   ): [Entry]!
//   EntryFilterQ(
//     dateFrom: DateMidnightUtc
//     dateTo: DateMidnightUtc
//     limit: Int
//     offset: Int
//     self: Boolean
//     tags: [ObjectId!]
//     users: [ObjectId!]
//     sort: SortI
//   ): Page
//   EntryFilterAsCsvQ(
//     limit: Int
//     dateFrom: DateMidnightUtc
//     dateTo: DateMidnightUtc
//     tags: [ObjectId]
//     dateFormat: String
//     durationFormat: String
//   ): String!
//   TagPartialQ(
//     tagPartial: String
//   ): [Tag]!
//   TagQ(
//     offset: Int
//     limit: Int
//     showArchived: Boolean
//   ): Page
//   UserPartialQ(
//     userPartial: String
//   ): [User]!
//   DurationByDayQ(
//     dateFrom: Date!
//     dateTo: Date!
//   ): [Duration]!
//   SelfQ: User!
// }
// `

module.exports = {
  Query
}
