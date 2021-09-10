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
  await Promise.all(Object.values(sequelize.models).map((m) => m.drop()))

  pc.wh('done, shutting down')
  sequelize.close()
}

if (require.main === module)
  purge(yargsParser(process.argv.slice(2)))

module.exports = {
  purge
}
