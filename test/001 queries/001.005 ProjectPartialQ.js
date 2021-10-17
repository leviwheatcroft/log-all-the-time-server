/* ================================================================== fixture ==
rm db.sqlite && \
node test/dbAdmin/createUsers.js --name=test --count=12 && \
node test/dbAdmin/createEntries.js --count=256 --projectSetCount=48  --tagSetCount=48 && \
sqlite3 db.sqlite '.dump' > test/001\ queries/001.005.sql
*/

const gql = require('graphql-tag')
const test = require('ava')

const {
  db: {
    sqlUp,
    User,
    Project
  },
  apollo: { query, setApolloContext }
} = require('../helpers')

test.before(async (t) => {
  await sqlUp('001 queries/001.005.sql')
  const user = await User.findOne({
    raw: true
  })

  setApolloContext({ user })
  t.context.user = user
})

const ProjectPartialQ = gql`
  query ProjectPartialQ(
    $projectPartial: String
    $limit: Int
    $offset: Int
  ) {
    ProjectPartialQ(
      projectPartial: $projectPartial
      limit: $limit
      offset: $offset
    ) {
      docs {
        ... on Project {
          id
          name
        }
      }
      hasMore
    }
  }
`

test.serial('ProjectPartialQ basic', async (t) => {
  const result = await query({
    query: ProjectPartialQ,
    variables: {}
  })
  const { docs, hasMore } = result.data.ProjectPartialQ

  t.truthy(docs.length === 24)
  t.truthy(hasMore === true)
})

test.serial('ProjectPartialQ limit', async (t) => {
  const result = await query({
    query: ProjectPartialQ,
    variables: {
      limit: 6
    }
  })
  const { docs, hasMore } = result.data.ProjectPartialQ

  t.truthy(docs.length === 6)
  t.truthy(hasMore === true)
})

test.serial('ProjectPartialQ partial', async (t) => {
  const $project = await Project.findOne()
  const result = await query({
    query: ProjectPartialQ,
    variables: {
      projectPartial: $project.name.slice(0, 4)
    }
  })
  const { docs } = result.data.ProjectPartialQ

  t.truthy(docs.some(({ name }) => name === $project.name))
})
