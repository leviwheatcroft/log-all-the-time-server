/* eslint-disable no-console */
require('dotenv-flow').config({ path: '../../' })
const {
  Writable
} = require('stream')
const dayjs = require('dayjs')
const { inspect } = require('util')
const chalk = require('chalk')
const yargsParser = require('yargs-parser')
const tml = require('../../lib/tml')
const {
  Log,
  mongooseConnect
} = require('../../db')

const levelColors = {
  silly () { return chalk.green(' silly ') },
  debug () { return chalk.green(' debug ') },
  verbose () { return chalk.blue('verbose') },
  http () { return chalk.white(' http  ') },
  info () { return chalk.white(' info  ') },
  warn () { return chalk.yellow(' warn  ') },
  error () { return chalk.red(' error ') },
}

async function log (opts) {
  const {
    help = false,
    unpretty = false,
    hideMeta = false,
    limit = 24,
    level = 'silly',
    quiet = false,
    hideTimestamps = false
  } = opts
  if (help) {
    console.log(`
      show log entries
        --unpretty       : no colors
        --hideMeta       : don't show meta
        --limit=24       : last 24 entries
        --quiet          : only output entries
        --hideTimestamps : don't show timestamps
    `)
    return
  }
  tml.line()

  const db = await mongooseConnect()

  const _levels = [
    'silly',
    'debug',
    'verbose',
    'http',
    'info',
    'warn',
    'error'
  ]
  const levels = _levels.slice(_levels.findIndex((l) => l === level))

  if (!quiet) {
    console.log(`
      query is:
        last ${limit} entries
        from levels: ${levels.join(', ')}
    `)
  }

  const entries = await Log.find(
    {
      level: { $in: levels }
    },
    null,
    {
      limit
    }
  ).cursor()

  const toStdOut = new Writable({
    objectMode: true,
    writev (chunks, callback) {
      chunks.forEach(({ chunk }) => {
        let {
          timestamp,
          level
        } = chunk
        const {
          // level,
          message,
          meta,
          // timestamp
        } = chunk

        if (hideTimestamps)
          timestamp = ''
        else
          timestamp = dayjs(timestamp).format('DD/MM/YY HH:mm:ss ')

        if (!unpretty) {
          level = levelColors[level]()
          timestamp = chalk.magenta(timestamp)
        }

        console.log(`[${timestamp}${level}] ${message}`)
        if (hideMeta && meta)
          console.log(inspect(meta))
        callback()
      })
    }
  })
  let streamComplete
  toStdOut.on('close', () => {
    streamComplete()
  })

  entries.pipe(toStdOut)

  await new Promise((resolve) => { streamComplete = resolve })
  if (!quiet)
    tml.wh('done, shutting down')
  db.disconnect()
}

if (require.main === module)
  log(yargsParser(process.argv.slice(2)))

module.exports = {
  log
}
