const winston = require('winston')
const Transport = require('winston-transport')
const {
  sqlInitialised,
  Log
} = require('../db')

const consoleTransport = new winston.transports.Console({
  level: process.env.LOG_LEVEL_CONSOLE
})

const PostgresTransport = class PostgresTransport extends Transport {
  log ({ level, message, meta }, callback) {
    sqlInitialised
      .then(() => {
        return Log.create({
          level,
          message,
          ...meta ? { meta: JSON.stringify(meta) } : {}
        })
      })
      .then(() => callback())
  }
}

const postgresTransport = new PostgresTransport()

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [consoleTransport, postgresTransport]
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
