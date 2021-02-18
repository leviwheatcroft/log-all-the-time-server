require('dotenv-flow').config({ path: '../' })
/* eslint-disable no-console */
const {
  readFile
} = require('fs').promises
const { default: asyncPool } = require('tiny-async-pool')
const {
  Entry,
  Tag,
  connect
} = require('../db')

async function repopulate () {
  const connection = await connect()
  if (process.argv[2] !== 'descructive!') {
    console.log('this script will destroy Entry and Tag collections.')
    console.log('if you\'re really sure that\'s what you want, run it like')
    console.log('node repopulate.js descructive!')
    return
  }

  await Entry.deleteMany({}).exec()
  await Tag.deleteMany({}).exec()
  const raw = await readFile('entries.json')
  const entries = JSON.parse(raw)
  await asyncPool(6, entries, async (entry) => {
    const tags = entry.tags.map((tag, idx) => [tag, idx])

    await asyncPool(1, tags, async ([tag, idx]) => {
      const result = await Tag.findOneAndUpdate(
        {
          tag
        },
        {
          tag
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
