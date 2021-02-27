const gql = require('graphql-tag')

const EntryI = gql`
input EntryI {
  id: ObjectId
  description: String!
  date: Date!
  duration: Int!
  deleted: Boolean
  tags: [TagI]!
}
`

module.exports = {
  EntryI
}
