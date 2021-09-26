const gql = require('graphql-tag')

const DaySummaries = gql`
type DaySummaries {
  daySummaries: [DaySummary]!
  maxDayDuration: Int!
}
`

module.exports = {
  DaySummaries
}
