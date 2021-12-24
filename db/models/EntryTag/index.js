// const { DataTypes } = require('sequelize')
const { reconcile } = require('./reconcile')

const EntryTag = {
  fields: {},
  options: {},
  staticMethods: {
    reconcile
  },
  afterInstantiate (models) {
    const {
      Entry,
      EntryTag,
      Tag
    } = models
    EntryTag.belongsTo(Entry)
    EntryTag.belongsTo(Tag)
  }
}

module.exports = { EntryTag }
