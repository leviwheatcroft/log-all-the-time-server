const {
  Sequelize
} = require('sequelize')

const modelDefinitions = require('./models')

const sequelize = new Sequelize(process.env.POSTGRES_URI)

const models = Object.fromEntries(
  Object.entries(modelDefinitions).map(([name, { fields, options }]) => {
    return [name, sequelize.define(name, fields, options)]
  })
)

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
  ...models
}
