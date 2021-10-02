const gql = require('graphql-tag')

const EntryI = gql`
input EntryI {
  id: Int
  description: String!
  date: DateMidnightUtc!
  duration: Int!
  project: ProjectI!
  tags: [TagI]!
}
`

module.exports = {
  EntryI
}
