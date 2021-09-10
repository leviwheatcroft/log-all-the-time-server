// const { DataTypes } = require('sequelize')

const Team = {
  fields: {},
  options: {},
  associations ({ Team, User }) {
    Team.hasMany(User)
  }
}

module.exports = { Team }
