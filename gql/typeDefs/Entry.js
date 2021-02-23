const gql = require('graphql-tag')

const Entry = gql`
type Entry {
  id: ObjectId
  raw: String
  description: String
  date: Date
  timeStart: String
  timeEnd: String
  duration: Int
  tags: [Tag]
}
`

module.exports = {
  Entry
}
