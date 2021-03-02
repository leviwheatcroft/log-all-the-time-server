const gql = require('graphql-tag')

const EntryI = gql`
input EntryI {
  id: ObjectId
  description: String!
  date: DateMidnightUtc!
  duration: Int!
  deleted: Boolean
  tags: [TagI]!
}
`

module.exports = {
  EntryI
}
