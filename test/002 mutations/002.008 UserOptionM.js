/* ================================================================== fixture ==
rm db.sqlite && \
node test/dbAdmin/createUsers.js --name=test && \
sqlite3 db.sqlite '.dump' > test/002\ mutations/002.008.sql
*/

const gql = require('graphql-tag')
const test = require('ava')

const {
  db: {
    sqlUp,
    User
  },
  apollo: { mutate, setApolloContext }
} = require('../helpers')

test.before(async (t) => {
  await sqlUp('002 mutations/002.008.sql')
  const user = await User.findOne()

  setApolloContext({ user })
  t.context.user = user
})
test.beforeEach((t) => setApolloContext({ squelchErrors: false }))

const UserOptionM = gql`
  mutation UserOptionM(
    $project: ProjectI!
  ) {
    ProjectUpdateM(
      project: $project
    ) {
      id,
      name,
      archived
    }
  }
`

test.serial('ProjectUpdateM archived', async (t) => {
  const $project = await Project.findOne()
  const {
    id,
    name
  } = $project.toGql()

  const result = await mutate({
    mutation: ProjectUpdateM,
    variables: {
      project: {
        id,
        name,
        archived: true
      }
    }
  })
  const updatedProject = result.data.ProjectUpdateM
  t.truthy(updatedProject.archived === true)
})
