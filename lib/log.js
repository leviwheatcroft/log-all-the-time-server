const winston = require('winston')
require('winston-mongodb')

const mongoFormat = winston.format((logEntry) => {
  const metaEntries = Object.entries(logEntry).filter(([key]) => {
    return (key !== 'level' && key !== 'message' && typeof key !== 'symbol')
  })
  if (metaEntries.length)
    logEntry.metadata = Object.fromEntries(metaEntries)
  return logEntry
})

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({
      level: process.env.LOG_LEVEL_CONSOLE
    }),
    new winston.transports.MongoDB({
      db: process.env.MONGODB_URI,
      level: process.env.LOG_LEVEL_DB,
      options: { useUnifiedTopology: true },
      format: mongoFormat(),
      collection: 'logs'
    })
  ]
})

function silly (message, meta) {
  logger.log({ level: 'silly', message, ...meta })
}
function debug (message, meta) {
  logger.log({ level: 'debug', message, ...meta })
}
function verbose (message, meta) {
  logger.log({ level: 'verbose', message, ...meta })
}
function http (message, meta) {
  logger.log({ level: 'http', message, ...meta })
}
function info (message, meta) {
  logger.log({ level: 'info', message, ...meta })
}
function warn (message, meta) {
  logger.log({ level: 'warn', message, ...meta })
}
function error (message, meta) {
  logger.log({ level: 'error', message, ...meta })
}

module.exports = {
  logger,
  silly,
  debug,
  verbose,
  http,
  info,
  warn,
  error
}
