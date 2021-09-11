const { DataTypes } = require('sequelize')

const EntryTag = {
  fields: {
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  options: {},
  associations (models) {
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
