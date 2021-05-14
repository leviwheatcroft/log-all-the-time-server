/* eslint-disable no-console */
require('dotenv-flow').config({ path: '../../' })
const yargsParser = require('yargs-parser')
const gql = require('graphql-tag')

const tml = require('../../lib/tml')
const {
  midnightUtc
} = require('../../lib/midnightUtc')
const {
  mutate,
  setApolloContext
} = require('../helpers/apollo')
const {
  User,
  mongooseConnect
} = require('../../db')
const {
  uniqueRandomWords,
  randomWords
} = require('../helpers/randomWords')
const {
  disconnectLogger
} = require('../../lib/log')

async function createEntries (opts) {
  const {
    count = 24,
    tagSetCount = 10
  } = opts
  const timer = new tml.Timer()
  tml.line()
  tml.bl(`starting mongoose: ${process.env.MONGODB_URI}`)
  const db = await mongooseConnect()

  const EntryUpsertM = gql`
    mutation EntryUpsertM($entry: EntryI!) {
      EntryUpsertM(entry: $entry) {
        id
        user {
          username
        }
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

  const day = (24 * 60 * 60 * 1000)
  const midnight = midnightUtc(new Date())
  const dateStart = midnight.valueOf() - (day * 5)
  const dateRange = 10 // days
  const tagSetA = uniqueRandomWords(tagSetCount)
  const tagSetB = uniqueRandomWords(tagSetCount)

  function date () {
    const modifier = Math.floor(Math.random() * dateRange) * day
    const date = new Date(dateStart + modifier)

    return date
  }
  function tags () {
    const idxA = Math.floor(Math.random() * tagSetA.length)
    const idxB = Math.floor(Math.random() * tagSetB.length)
    return [
      { tagName: tagSetA[idxA] },
      { tagName: tagSetB[idxB] }
    ]
  }
  function duration () {
    return Math.floor(Math.random() * 60)
  }
  function description () {
    const minLength = 3
    const modifier = Math.floor(Math.random() * 10)
    return randomWords(minLength + modifier)
  }

  const users = await User.find()

  function user () {
    const idx = Math.floor(Math.random() * users.length)
    return users[idx]
  }

  const table = new tml.Table()

  for (let i = 0; i < count; i += 1) {
    const entry = {
      date: date(),
      tags: tags(),
      duration: duration(),
      description: description()
    }
    setApolloContext({ user: user() })
    const result = await mutate({
      mutation: EntryUpsertM,
      variables: { entry }
    })
    table.push(result.data.EntryUpsertM)
  }

  tml.wh(`recorded ${count} entries`)
  tml.wh(`this op took: ${timer.elapsed()}`)
  table.write()

  tml.bl('stopping apollo & db')
  await db.disconnect()
  disconnectLogger()
  tml.bl('stopped')
}

if (require.main === module)
  createEntries(yargsParser(process.argv.slice(2)))

module.exports = {
  createEntries
}
