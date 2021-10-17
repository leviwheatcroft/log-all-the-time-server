/* ================================================================== fixture ==
see 002.005
*/

// const check = require('check-types')
const gql = require('graphql-tag')
const test = require('ava')
// const dayjs = require('dayjs')

const {
  db: {
    sqlUp,
    User,
    Project
  },
  apollo: { mutate, setApolloContext }
} = require('../helpers')

test.before(async (t) => {
  await sqlUp('002 mutations/002.005.sql')
  const user = await User.findOne()

  setApolloContext({ user })
  t.context.user = user
})
test.beforeEach((t) => setApolloContext({ squelchErrors: false }))

const ProjectUpdateM = gql`
  mutation ProjectUpdateM(
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
