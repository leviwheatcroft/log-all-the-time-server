const {
  Sequelize
} = require('sequelize')

const modelDefinitions = require('./models')

const sequelize = new Sequelize(
  process.env.POSTGRES_URI,
  {
    logging (...log) {
      if (!process.env.SEQUELIZE_LOG)
        return
      // eslint-disable-next-line no-console
      console.log(log)
    }
  }
)

Object.entries(modelDefinitions).map(([name, { fields, options }]) => {
  return [name, sequelize.define(name, fields, options)]
})

Object.values(modelDefinitions).forEach(({ associations }) => {
  associations(sequelize.models)
})

const dbInitialised = new Promise((resolve) => {
  sequelize.authenticate()
    .then(() => sequelize.sync())
    .then(() => resolve(sequelize))
    .catch((err) => {
      console.error(err)
    })
})

module.exports = {
  dbInitialised,
  sequelize,
  ...sequelize.models
}
