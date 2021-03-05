require('dotenv-flow').config({ path: '../../' })
const yargsParser = require('yargs-parser')
const mongoose = require('mongoose')
const tml = require('../../lib/tml')
const {
  User,
  Entry,
  Tag,
  Team
} = require('../../db')

async function purge (opts) {
  const {
    yesReally = false,
    uri
  } = opts
  tml.line()
  if (!yesReally) {
    tml.rd(`
      Whoa there. This will purge whichever database you point it at.

      If you really want to do that, you need to call it with --yesReally

      the uri in .env is:
      ${process.env.MONGODB_URI}
    `)
    return
  }
  if (!uri)
    throw new RangeError('you need to specify the mongo uri with --uri')

  mongoose.set('useFindAndModify', false)
  mongoose.set('useCreateIndex', true)
  mongoose.set('useNewUrlParser', true)
  mongoose.set('useUnifiedTopology', true)
  const instance = mongoose.connect(uri)
  instance.catch((err) => {
    console.error(err)
    console.error('MongooseDB connection error.')
    process.exit()
  })

  const models = [
    User,
    Entry,
    Tag,
    Team
  ]

  // eslint-disable-next-line no-restricted-syntax
  for await (const Model of models) {
    const count = await Model.estimatedDocumentCount()
    await Model.deleteMany({})
    tml.rd(`Deleted ${count} docs from ${Model.modelName}`)
  }

  tml.wh('done, shutting down')
  mongoose.disconnect()
}

if (require.main === module)
  purge(yargsParser(process.argv.slice(2)))

module.exports = {
  purge
}
