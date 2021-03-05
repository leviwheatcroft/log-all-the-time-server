require('dotenv-flow').config({ path: '../../' })
const mongoose = require('mongoose')
const tml = require('../../lib/tml')
const {
  User,
  Entry,
  Tag,
  Team
} = require('../../db')

async function purge () {
  tml.line()
  if (process.argv[3] !== 'yesReally!') {
    tml.rd('Woah there. This will purge whichever database you')
    tml.rd('point it at.')
    tml.rd('')
    tml.wh('The syntax is:')
    tml.wh('node purge.js <dbUri> yesReally!')
    tml.wh('')
    tml.wh('the uri in .env is:')
    tml.wh(process.env.MONGODB_URI)
    return
  }

  mongoose.set('useFindAndModify', false)
  mongoose.set('useCreateIndex', true)
  mongoose.set('useNewUrlParser', true)
  mongoose.set('useUnifiedTopology', true)
  const instance = mongoose.connect(process.argv[2])
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

purge()
