const { DataTypes } = require('sequelize')

const Project = {
  fields: {
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  options: {},
  associations ({ Project, Team, Entry }) {
    Project.belongsTo(Team)
    Project.hasMany(Entry)
  }
}

module.exports = { Project }
