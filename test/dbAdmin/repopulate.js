/* eslint-disable no-console */
require('dotenv-flow').config({ path: '../../' })
const gql = require('graphql-tag')

const {
  readFileSync
} = require('fs')

const tml = require('../helpers/tml')
const {
  midnightUtc
} = require('../../lib/midnightUtc')
const {
  mutate,
  setApolloContext
} = require('../helpers/apollo')
const {
  Entry,
  Tag,
  User,
  mongooseConnect
} = require('../../db')



let words

function randomWord () {
  if (!words)
    words = readFileSync('./words.txt', 'utf8').split(' ')
  const idx = Math.floor(Math.random() * words.length)
  return words[idx]
}
function randomWords (count) {
  const words = []
  for (let i = 0; i < count; i += 1)
    words.push(randomWord())
  return words
}

async function repopulate () {
  const timer = new tml.Timer()
  tml.line()
  tml.bl(`starting mongoose: ${process.env.MONGODB_URI}`)
  const db = await mongooseConnect()

  const user = await User.findOne()
  setApolloContext({ user })

  if (process.argv[3] === 'purge!') {
    await Entry.deleteMany({}).exec()
    await Tag.deleteMany({}).exec()
    tml.wh('purged all existing entries & tags')
  }

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

  const entryCount = process.argv[2] || 24

  const day = (24 * 60 * 60 * 1000)
  const midnight = midnightUtc(new Date())
  const dateStart = midnight.valueOf() - (day * 5)
  const dateRange = 10 // days
  const tagSetA = randomWords(10)
  const tagSetB = randomWords(4)

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
    return randomWords(minLength + modifier).join(' ')
  }

  const table = new tml.Table()

  function* _entries () {
    let i = 0
    while (i < entryCount) {
      i += 1
      const entry = {
        date: date(),
        tags: tags(),
        duration: duration(),
        description: description()
      }
      table.push(entry)
      yield entry
    }
  }

  const entries = _entries()

  const deferred = []

  async function worker () {
    let resolver
    // eslint-disable-next-line no-return-assign
    deferred.push(new Promise((resolve) => resolver = resolve))
    while (!entries.done) {
      const { done, value: entry } = entries.next()
      if (done) {
        entries.done = true
        break
      }
      await mutate({
        mutation: EntryUpsertM,
        variables: { entry }
      })
    }
    resolver()
  }

  for (let i = 0; i < 6; i += 1)
    worker()

  await Promise.all(deferred)

  tml.wh(`recorded ${entryCount} entries`)
  tml.wh(`this op took: ${timer.elapsed()}`)
  table.write()

  tml.bl('stopping apollo & db')
  await db.disconnect()
  tml.bl('stopped')
}

repopulate()
