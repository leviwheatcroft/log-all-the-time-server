const { DataTypes } = require('sequelize')
const { toGql } = require('./toGql')

const UserDialog = {
  fields: {
    initial: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  },
  options: {
  },
  instanceMethods: {
    toGql
  },
  afterInstantiate ({ UserDialog, User }) {
    UserDialog.belongsTo(User)
  }
}

module.exports = { UserDialog }
