require('dotenv-flow').config({ path: `${__dirname}/../../` })
const yargsParser = require('yargs-parser')

const pc = require('../../lib/prettyConsole')
const {
  dbInitialised,
  sequelize
} = require('../../db')

async function purge (opts) {
  const {
    yesReally = false,
    uri
  } = opts
  pc.line()
  if (!yesReally) {
    pc.rd(`
      Whoa there. This will purge whichever database you point it at.

      If you really want to do that, you need to call it with --yesReally

      the uri in .env is:
      ${process.env.POSTGRES_URI}
    `)
    sequelize.close()
    return
  }
  if (!uri)
    throw new RangeError('you need to specify the mongo uri with --uri')

  await dbInitialised
  const {
    Entry,
    EntryTag,
    Log,
    Project,
    Tag,
    Team,
    User
  } = sequelize.models

  // tables need to be dropped in the right order to avoid dropping dependencies
  try {
    await Log.drop()
    await EntryTag.drop()
    await Entry.drop()
    await Project.drop()
    await Tag.drop()
    await User.drop()
    await Team.drop()
  } catch (err) {
    pc.rd(err)
  }
  pc.wh('done, shutting down')
  sequelize.close()
}

if (require.main === module)
  purge(yargsParser(process.argv.slice(2)))

module.exports = {
  purge
}
