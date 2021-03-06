const mongoose = require('mongoose')
const Log = require('./models/Log')
const User = require('./models/User')
const Entry = require('./models/Entry')
const Tag = require('./models/Tag')
const Team = require('./models/Team')

let instance

/**
 * ## listen
 * this fn is unusual in that it's not declared as an `async` function, but
 * it still returns a promise, therefore it can be called with `await connect()`
 * note that it returns a mongoose instance, so if you want the mongo db
 * connection, you need to `connection = (await db.connect()).connection`
 */
function mongooseConnect (uri) {
  if (instance)
    return instance

  mongoose.set('useFindAndModify', false)
  mongoose.set('useCreateIndex', true)
  mongoose.set('useNewUrlParser', true)
  mongoose.set('useUnifiedTopology', true)

  // you can't simply `connection = await mongoost.connect()` because in that
  // case the global `connection` would remain undefined until the promise
  // is resolved
  instance = mongoose.connect(uri || process.env.MONGODB_URI)
  instance.catch((err) => {
    console.error(err)
    console.error('MongooseDB connection error.')
    process.exit()
  })

  return instance
}

module.exports = {
  Log,
  User,
  Entry,
  Tag,
  Team,
  mongooseConnect
}
