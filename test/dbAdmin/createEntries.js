/* eslint-disable no-console */
require('dotenv-flow').config({ path: `${__dirname}/../../` })
const yargsParser = require('yargs-parser')
const gql = require('graphql-tag')

const pc = require('../../lib/prettyConsole')
const {
  midnightUtc
} = require('../../lib/midnightUtc')
const {
  mutate,
  setApolloContext
} = require('../helpers/apollo')
const {
  User,
  dbInitialised,
  sequelize
} = require('../../db')
const {
  uniqueRandomWords,
  randomWords
} = require('../helpers/randomWords')

async function createEntries (opts) {
  const {
    count = 24,
    tagSetCount = 10,
    projectSetCount = 3
  } = opts
  const timer = new pc.Timer()
  pc.line()
  pc.bl(`starting mongoose: ${process.env.MONGODB_URI}`)
  await dbInitialised

  const EntryCreateM = gql`
    mutation EntryCreateM($entry: EntryI!) {
      EntryCreateM(entry: $entry) {
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
  const projectSet = uniqueRandomWords(projectSetCount)

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
  function project () {
    const idx = Math.floor(Math.random() * projectSet.length)
    return { projectName: projectSet[idx] }
  }
  function duration () {
    return Math.floor(Math.random() * 60)
  }
  function description () {
    const minLength = 3
    const modifier = Math.floor(Math.random() * 10)
    return randomWords(minLength + modifier)
  }

  // const users = await User.findAll({ include: Team })
  const users = await User.findAll()

  function user () {
    const idx = Math.floor(Math.random() * users.length)
    return users[idx].get()
  }

  const table = new pc.Table()

  for (let i = 0; i < count; i += 1) {
    const entry = {
      date: date(),
      tags: tags(),
      duration: duration(),
      description: description(),
      project: project()
    }
    setApolloContext({ user: user() })
    const result = await mutate({
      mutation: EntryCreateM,
      variables: { entry }
    })
    table.push(result.data.EntryCreateM)
  }

  pc.wh(`recorded ${count} entries`)
  pc.wh(`this op took: ${timer.elapsed()}`)
  table.write()

  pc.bl('stopping apollo & db')
  await sequelize.close()
  pc.bl('stopped')
}

if (require.main === module)
  createEntries(yargsParser(process.argv.slice(2)))

module.exports = {
  createEntries
}
