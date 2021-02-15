const gql = require('graphql-tag')

const Entry = gql`
type Entry {
  id: ObjectId
  raw: String
  date: Date
  timeStart: String
  timeEnd: String
  duration: Int
  tags: [String]
}
`

const EntryI = gql`
input EntryI {
  id: ObjectId
  raw: String
  date: Date
  timeStart: String
  timeEnd: String
  duration: Int
  tags: [String]
}
`

module.exports = {
  Entry,
  EntryI
}
