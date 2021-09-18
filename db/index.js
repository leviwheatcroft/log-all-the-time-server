const {
  Sequelize
} = require('sequelize')

const modelDefinitions = require('./models')

let sqlInitialisedResolver
// eslint-disable-next-line no-return-assign
const sqlInitialised = new Promise((r) => sqlInitialisedResolver = r)

function logging (...log) {
  if (!process.env.SEQUELIZE_LOG)
    return
  // eslint-disable-next-line no-console
  console.log(log)
}

const connectionParams = {
  host: process.env.SEQUELIZE_HOST,
  port: process.env.SEQUELIZE_PORT,
  username: process.env.SEQUELIZE_USERNAME,
  password: process.env.SEQUELIZE_PASSWORD,
  database: process.env.SEQUELIZE_DATABASE,
  dialect: process.env.SEQUELIZE_DIALECT,
  storage: process.env.SEQUELIZE_STORAGE,
  logging
}

const sequelize = new Sequelize(connectionParams)

Object.entries(modelDefinitions).map(([name, { fields, options }]) => {
  return [name, sequelize.define(name, fields, options)]
})

Object.values(modelDefinitions).forEach(({ associations }) => {
  associations(sequelize.models)
})

sequelize.authenticate()
  .then(() => {
    if (process.env.NODE_ENV !== 'test')
      return sequelize.sync()
  })
  .then(() => sqlInitialisedResolver(sequelize))
  .catch((err) => {
    console.error(err)
    throw err
  })

module.exports = {
  sqlInitialised,
  sequelize,
  ...sequelize.models
}
