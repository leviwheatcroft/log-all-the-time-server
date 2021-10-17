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
    Tag
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

const TagUpdateM = gql`
  mutation TagUpdateM(
    $tag: TagI!
  ) {
    TagUpdateM(
      tag: $tag
    ) {
      id,
      name,
      archived
    }
  }
`

test.serial('TagUpdateM archived', async (t) => {
  const $tag = await Tag.findOne()
  const {
    id,
    name
  } = $tag.toGql()

  const result = await mutate({
    mutation: TagUpdateM,
    variables: {
      tag: {
        id,
        name,
        archived: true
      }
    }
  })
  const updatedTag = result.data.TagUpdateM
  t.truthy(updatedTag.archived === true)
})
