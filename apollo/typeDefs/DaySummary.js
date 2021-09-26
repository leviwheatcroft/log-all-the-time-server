const gql = require('graphql-tag')

const DaySummary = gql`
type DaySummary {
  id: String!
  date: Date!
  projectSummaries: [ProjectSummary]!
  dayDuration: Int!
}
`

module.exports = {
  DaySummary
}
