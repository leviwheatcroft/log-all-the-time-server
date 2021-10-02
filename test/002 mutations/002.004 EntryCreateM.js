/* ================================================================== fixture ==
see 002.002
*/

// const check = require('check-types')
const gql = require('graphql-tag')
const test = require('ava')

const {
  db: { sqlUp, User },
  apollo: { mutate, setApolloContext }
} = require('../helpers')

test.before(async (t) => {
  await sqlUp('002 mutations/002.002.sql')
  const user = await User.findOne()

  setApolloContext({ user })
  t.context.user = user
})
test.beforeEach((t) => setApolloContext({ squelchErrors: false }))

const EntryCreateM = gql`
  mutation EntryCreateM(
    $entry: EntryI!
  ) {
    EntryCreateM(
      entry: $entry
    ) {
      createdAt
      date
      deletedAt
      description
      duration
      id
      project {
        id
        projectName
      }
      tags {
        id
        tagName
      }
      user {
        id
        username
        gravatar
      }
    }
  }
`

test.serial('EntryCreateM basic', async (t) => {
  const midnightUtcMs = Math.floor(Date.now() / 86400000) * 86400000
  const result = await mutate({
    mutation: EntryCreateM,
    variables: {
      entry: {
        description: 'description',
        date: new Date(midnightUtcMs),
        duration: 15,
        project: { projectName: 'projectName' },
        tags: []
      }
    }
  })
  // console.log(result)
  const entry = result.data.EntryCreateM

  // console.log(entry)
  t.truthy(entry)
})
