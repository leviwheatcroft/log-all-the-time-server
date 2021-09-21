const dotEnvFlow = require('dotenv-flow')

dotEnvFlow.config({ path: `${__dirname}/../../` })
dotEnvFlow.load(`${__dirname}/../../.env.sqlite`)

const {
  sqlInitialised
} = require('../../db')

const pc = require('../../lib/prettyConsole')

async function createEmpty (opts) {
  const timer = new pc.Timer()
  pc.line()
  const sql = await sqlInitialised

  pc.wh(`this op took: ${timer.elapsed()}`)

  pc.bl('db')
  await sql.close()
  pc.bl('stopped')
}

if (require.main === module)
  createEmpty()

module.exports = {
  createEmpty
}
