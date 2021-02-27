/* eslint-disable no-console */
const { default: asyncPool } = require('tiny-async-pool')
require('dotenv-flow').config({ path: '../../' })
const {
  readFileSync
} = require('fs')

const {
  midnightUtc
} = require('../../lib/midnightUtc')

const {
  Entry,
  Tag,
  connect
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
  const connection = await connect()
  if (process.argv[2] !== 'destructive!') {
    console.log('this script will destroy Entry and Tag collections.')
    console.log('if you\'re really sure that\'s what you want, run it like')
    console.log('node repopulate.js destructive!')
    connection.disconnect()
    return
  }

  await Entry.deleteMany({}).exec()
  await Tag.deleteMany({}).exec()

  const entryCount = process.argv[3] || 24

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
      tagSetA[idxA],
      tagSetB[idxB]
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

  const entries = []

  for (let i = 0; i < entryCount; i += 1) {
    entries.push({
      date: date(),
      tags: tags(),
      duration: duration(),
      description: description()
    })
  }

  await asyncPool(6, entries, async (entry) => {
    const tags = entry.tags.map((tag, idx) => [tag, idx])
    await asyncPool(1, tags, async ([tagName, idx]) => {
      const result = await Tag.findOneAndUpdate(
        {
          tagName
        },
        {
          tagName
        },
        {
          upsert: true,
          new: true
        }
      ).exec()
      entry.tags[idx] = result
    })

    entry = new Entry(entry)
    await entry.save()
  })
  connection.disconnect()
}

repopulate()
