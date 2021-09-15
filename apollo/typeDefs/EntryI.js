const gql = require('graphql-tag')

const EntryI = gql`
input EntryI {
  description: String!
  date: DateMidnightUtc!
  duration: Int!
  active: Boolean
  project: ProjectI!
  tags: [TagI]!
}
`

module.exports = {
  EntryI
}
