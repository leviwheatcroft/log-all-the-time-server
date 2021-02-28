const {
  MongoMemoryServer
} = require('mongodb-memory-server')
const {
  spawnSync
} = require('child_process')
const {
  connect: dbConnect
} = require('../../db')

async function createDb (archive, debug = false) {
  const db = new MongoMemoryServer({
    instance: {
      dbName: 'timelog'
    }
  })
  const dbUri = await db.getUri()
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
  // console.log(restoreProcess.stdout.toString())
  if (debug)
    console.log(restoreProcess.stderr.toString())
  await dbConnect(dbUri)
  return db
}

module.exports = {
  createDb
}
