/* ================================================================== fixture ==
see 001.005
*/

const gql = require('graphql-tag')
const test = require('ava')

const {
  db: {
    sqlUp,
    User,
    Tag
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

const TagPartialQ = gql`
  query TagPartialQ(
    $tagPartial: String
    $limit: Int
    $offset: Int
  ) {
    TagPartialQ(
      tagPartial: $tagPartial
      limit: $limit
      offset: $offset
    ) {
      docs {
        ... on Tag {
          id
          name
        }
      }
      hasMore
    }
  }
`

test.serial('TagPartialQ basic', async (t) => {
  const result = await query({
    query: TagPartialQ,
    variables: {}
  })
  const { docs, hasMore } = result.data.TagPartialQ

  console.log(docs)

  t.truthy(docs.length === 24)
  t.truthy(hasMore === true)
})

test.serial('TagPartialQ limit', async (t) => {
  const result = await query({
    query: TagPartialQ,
    variables: {
      limit: 6
    }
  })
  const { docs, hasMore } = result.data.TagPartialQ

  t.truthy(docs.length === 6)
  t.truthy(hasMore === true)
})

test.serial('TagPartialQ partial', async (t) => {
  const $tag = await Tag.findOne()
  const result = await query({
    query: TagPartialQ,
    variables: {
      tagPartial: $tag.name.slice(0, 4)
    }
  })
  const { docs } = result.data.TagPartialQ

  t.truthy(docs.some(({ name }) => name === $tag.name))
})
