const { DataTypes } = require('sequelize')
const { findCreateUnarchive } = require('./findCreateUnarchive')
const { toGql } = require('./toGql')

const Project = {
  fields: {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  },
  options: {},
  instanceMethods: {
    toGql
  },
  staticMethods: {
    findCreateUnarchive
  },
  afterInstantiate ({ Project, Team, Entry }) {
    Project.belongsTo(Team)
    Project.hasMany(Entry)
  }
}

module.exports = { Project }
