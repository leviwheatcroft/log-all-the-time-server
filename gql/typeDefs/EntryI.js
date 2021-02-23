const gql = require('graphql-tag')

const EntryI = gql`
input EntryI {
  id: ObjectId
  description: String!
  date: Date!
  duration: Int!
  tags: [TagI]!
}
`

module.exports = {
  EntryI
}
