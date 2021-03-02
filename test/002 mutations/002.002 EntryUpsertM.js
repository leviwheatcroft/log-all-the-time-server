// https://janikvonrotz.ch/2019/12/05/apollo-graphql-integration-testing-in-practice/
require('dotenv-flow').config('../../')

const gql = require('graphql-tag')
const test = require('ava')
const {
  User,
  Tag,
  Entry
} = require('../../db')

const {
  db: { createDb },
  apollo: { mutate, setContext }
} = require('../helpers')

test.before(async (t) => {
  await createDb('002 mutations/002.002.archive')
})

const EntryUpsertM = gql`
  mutation EntryUpsertM($entry: EntryI!) {
    EntryUpsertM(entry: $entry) {
      id
      description
      date
      duration
      tags {
        id
        tagName
      }
    }
  }
`

test.serial('EntryUpsertM create new entry', async (t) => {
  const user = await User.findOne()
  setContext({ user })

  const result = await mutate({
    mutation: EntryUpsertM,
    variables: {
      entry: {
        date: new Date(Date.UTC(2021, 1, 1, 0, 0, 0)),
        description: 'desc',
        duration: 15,
        tags: [
          { tagName: 'tag' }
        ]
      }
    }
  })
  t.is(result.data.EntryUpsertM.description, 'desc')

  const entry = await Entry.findOne()
  t.is(entry.team.toString(), '603e3583d92041cad1e810c2')

  const tag = await Tag.findOne()
  t.is(tag.team.toString(), '603e3583d92041cad1e810c2')
})
