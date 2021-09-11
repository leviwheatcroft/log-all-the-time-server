const { DataTypes } = require('sequelize')

const Team = {
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
      User,
      Team,
      Tag
    } = models
    Team.hasMany(User)
    Team.hasMany(Tag)
    Team.hasMany(Entry)
  }
}

module.exports = { Team }
