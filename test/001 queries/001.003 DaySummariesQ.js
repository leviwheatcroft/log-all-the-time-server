/* ================================================================== fixture ==
see 001.002
*/
// require('dotenv-flow').config({ path: `${__dirname}/../../` })

const gql = require('graphql-tag')
const test = require('ava')

const {
  db: {
    sqlUp,
    Entry,
    User
  },
  apollo: { query, setApolloContext }
} = require('../helpers')

test.before(async (t) => {
  await sqlUp('001 queries/001.002.sql')
  const user = await User.findOne({
    raw: true
  })

  setApolloContext({ user })
  t.context.user = user
})

const DaySummariesQ = gql`
query DaySummariesQ(
  $dateFrom: DateMidnightUtc!
  $dateTo: DateMidnightUtc!
) {
  DaySummariesQ(
    dateFrom: $dateFrom
    dateTo: $dateTo
  ) {
    daySummaries {
      id
      date
      dayDuration
      projectSummaries {
        id
        name
        projectDuration
        portion
      }
    }
    maxDayDuration
  }
}
`

test.serial('DaySummariesQ returns summaries structure', async (t) => {
  const {
    date: dateTo
  } = await Entry.findOne({ order: [['date', 'DESC']] })
  const dateFrom = new Date(dateTo.valueOf() - (10 * 24 * 60 * 60 * 1000))

  const result = await query({
    query: DaySummariesQ,
    variables: {
      dateFrom: dateFrom.getTime(),
      dateTo: dateTo.getTime()
    }
  })

  const summaries = result.data.DaySummariesQ

  t.truthy(typeof summaries.maxDayDuration === 'number')
  t.truthy(Array.isArray(summaries.daySummaries))
  summaries.daySummaries.forEach((daySummary) => {
    t.truthy(typeof daySummary.id === 'string')
    t.truthy(typeof daySummary.date === 'number')
    t.truthy(typeof daySummary.dayDuration === 'number')
    t.truthy(Array.isArray(daySummary.projectSummaries))
    daySummary.projectSummaries.forEach((projectSummary) => {
      t.truthy(typeof projectSummary.portion === 'number')
      t.truthy(typeof projectSummary.id === 'string')
      t.truthy(typeof projectSummary.projectDuration === 'number')
    })
  })
})
