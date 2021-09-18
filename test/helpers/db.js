const {
  readFile
} = require('fs').promises
const {
  User,
  Entry,
  Team,
  sqlInitialised
} = require('../../db')

async function sqlUp (dump) {
  const sql = await sqlInitialised
  const queries = await readFile(`${__dirname}/../${dump}`, 'utf-8')
  // eslint-disable-next-line no-restricted-syntax
  for (const query of queries.split(/\n/)) {
    // skip empty lines
    if (!query.length)
      // eslint-disable-next-line no-continue
      continue
    await sql.query(query, { raw: true })
    // await sql.sync()
  }
}

module.exports = {
  User,
  Entry,
  Team,
  sqlInitialised,
  sqlUp
}
