const { DataTypes } = require('sequelize')

const Tag = {
  fields: {
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    tagName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  options: {},
  associations (models) {
    const {
      Entry,
      EntryTag,
      Team,
      Tag
    } = models
    Tag.belongsTo(Team)
    Tag.belongsToMany(Entry, { through: 'EntryTag' })
    Tag.hasMany(EntryTag)
  }
}

module.exports = { Tag }
