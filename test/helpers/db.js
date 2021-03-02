const {
  MongoMemoryServer
} = require('mongodb-memory-server')
const {
  spawnSync
} = require('child_process')
const {
  mongooseConnect
} = require('../../db')

async function createDb (archive, debug = false) {
  const db = new MongoMemoryServer({
    instance: {
      dbName: 'timelog'
    }
  })
  const dbUri = await db.getUri()
  if (archive) {
    const restoreProcess = spawnSync(
      'mongorestore',
      [
        `--uri="${dbUri}"`,
        `--archive="${archive}"`
      ],
      {
        cwd: 'test'
      }
    )
    if (debug)
      console.log(restoreProcess.stderr.toString())
  }
  await mongooseConnect(dbUri)
  return db
}

module.exports = {
  createDb
}
