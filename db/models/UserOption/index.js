const { DataTypes } = require('sequelize')
const { toGql } = require('./toGql')

const UserOption = {
  fields: {
    exportDateFormat: {
      type: DataTypes.STRING,
      defaultValue: 'DD/MM/YY'
    },
    exportDurationFormat: {
      type: DataTypes.STRING,
      defaultValue: 'HH:mm'
    },
  },
  options: {
  },
  instanceMethods: {
    toGql
  },
  afterInstantiate ({ UserOption, User }) {
    UserOption.belongsTo(User)
  }
}

module.exports = { UserOption }
