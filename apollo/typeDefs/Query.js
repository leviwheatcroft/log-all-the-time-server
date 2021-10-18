const gql = require('graphql-tag')

const Query = gql`
type Query {
  SelfQ: User!
  TagPartialQ(
    tagPartial: String
    limit: Int
    offset: Int
    includeArchived: Boolean
  ): Page
  ProjectPartialQ(
    projectPartial: String
    limit: Int
    offset: Int
    includeArchived: Boolean
  ): Page
  EntryFilterQ(
    dateFrom: DateMidnightUtc
    dateTo: DateMidnightUtc
    offset: Int
    projects: [ProjectI]
    tags: [TagI]
    users: [UserI]
    order: OrderI
    limit: Int
  ): Page
  EntryFilterAsCsvQ(
    dateFrom: DateMidnightUtc
    dateTo: DateMidnightUtc
    dateFormat: String
    durationFormat: String
    projects: [ProjectI]
    tags: [TagI]
    users: [UserI]
    order: OrderI
    limit: Int
  ): String!
  DaySummariesQ(
    dateFrom: DateMidnightUtc
    dateTo: DateMidnightUtc
  ): DaySummaries
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
