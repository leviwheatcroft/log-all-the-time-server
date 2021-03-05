/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */
const chalk = require('chalk')
const dayjs = require('dayjs')
const duration = require('dayjs/plugin/duration')

dayjs.extend(duration)

function line () {
  console.log(chalk.blue(''.padStart(process.stdout.columns, '=')))
}

class Timer {
  constructor () {
    this.start = Date.now()
  }

  elapsed () {
    const elapsed = Date.now() - this.start
    return dayjs.duration(elapsed).format('HH:mm:ss.SSS')
  }
}

class Table {
  constructor (maxEntries = 12) {
    this.count = 0
    this.maxEntries = maxEntries
    this.entries = []
  }

  push (entry) {
    this.count += 1
    if (this.entries.length === this.maxEntries)
      return
    this.entries.push({
      ...entry.user.username ? { username: entry.user.username } : {},
      date: dayjs(entry.date).format('DD/MM/YY'),
      duration: dayjs.duration({
        minutes: entry.duration % 60,
        hours: Math.floor(entry.duration / 60)
      }).format('HH:mm'),
      description: [
        entry.description.slice(0, 40),
        entry.description.length > 40 ? '...' : ''
      ].join(''),
      tags: entry.tags.map(({ tagName }) => tagName).join(', ')
    })
  }

  write () {
    console.table(this.entries)
    if (this.count > this.maxEntries)
      wh(`... and ${this.count - this.maxEntries} more entries`)
  }
}

function bl (...args) {
  console.log(chalk.blue(...args))
}

function wh (...args) {
  console.log(chalk.white(...args))
}

function bgRd (...args) {
  console.log(chalk.bgRed(...args))
}

function rd (...args) {
  console.log(chalk.red(...args))
}

// const bgBl = chalk.black.bgBlue
function bgBl (...args) {
  console.log(chalk.bgBlue.black(...args))
}

function inspect (...args) {
  console.log(...args)
}

module.exports = {
  line,
  bl,
  bgRd,
  bgBl,
  wh,
  rd,
  Table,
  Timer,
  inspect
}
