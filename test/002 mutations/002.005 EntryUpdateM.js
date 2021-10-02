/* ================================================================== fixture ==
rm db.sqlite && \
node test/dbAdmin/createUsers.js --username=test && \
node test/dbAdmin/createEntries.js --count=1 && \
sqlite3 db.sqlite '.dump' > test/002\ mutations/002.005.sql
*/

// const check = require('check-types')
const gql = require('graphql-tag')
const test = require('ava')
// const dayjs = require('dayjs')

const {
  db: {
    sqlUp,
    User,
    Entry,
    Project,
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

const EntryUpdateM = gql`
  mutation EntryUpdateM(
    $entry: EntryI!
  ) {
    EntryUpdateM(
      entry: $entry
    ) {
      createdAt
      date
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

test.serial('EntryUpdateM description', async (t) => {
  const entry = await Entry.findOne(Entry.withIncludes())
  const {
    id,
    date,
    duration,
    project,
    tags
  } = entry.toGql()

  const result = await mutate({
    mutation: EntryUpdateM,
    variables: {
      entry: {
        id,
        description: 'updated description',
        date: date.toDate(),
        duration,
        project,
        tags
      }
    }
  })
  const updatedEntry = result.data.EntryUpdateM
  t.truthy(updatedEntry.description === 'updated description')
})

test.serial('EntryUpdateM date', async (t) => {
  const entry = await Entry.findOne(Entry.withIncludes())
  const {
    id,
    date,
    duration,
    project,
    tags
  } = entry.toGql()

  const result = await mutate({
    mutation: EntryUpdateM,
    variables: {
      entry: {
        id,
        description: 'updated description',
        date: new Date(date.valueOf() + 86400000),
        duration,
        project,
        tags
      }
    }
  })
  const updatedEntry = result.data.EntryUpdateM
  t.truthy(updatedEntry.date === date.valueOf() + 86400000)
})

test.serial('EntryUpdateM new project', async (t) => {
  const entry = await Entry.findOne(Entry.withIncludes())
  const {
    id,
    date,
    description,
    duration,
    tags
  } = entry.toGql()

  const result = await mutate({
    mutation: EntryUpdateM,
    variables: {
      entry: {
        id,
        description,
        date,
        duration,
        project: {
          projectName: 'new project'
        },
        tags
      }
    }
  })
  const updatedEntry = result.data.EntryUpdateM

  t.truthy(updatedEntry.project.projectName === 'new project')

  const $project = await Project.findOne({
    where: { projectName: 'new project' }
  })
  t.truthy($project)
})

test.serial('EntryUpdateM new tag', async (t) => {
  const entry = await Entry.findOne(Entry.withIncludes())
  const {
    id,
    date,
    description,
    duration,
    project,
    tags
  } = entry.toGql()

  tags.pop()
  tags.push({ tagName: 'new tag' })

  const result = await mutate({
    mutation: EntryUpdateM,
    variables: {
      entry: {
        id,
        description,
        date,
        duration,
        project,
        tags
      }
    }
  })
  const updatedEntry = result.data.EntryUpdateM

  t.truthy(updatedEntry.tags.some(({ tagName }) => tagName === 'new tag'))

  const $tag = await Tag.findOne({
    where: { tagName: 'new tag' }
  })
  t.truthy($tag)
})
