// const { DataTypes } = require('sequelize')

const Team = {
  fields: {},
  options: {
    paranoid: true,
  },
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
