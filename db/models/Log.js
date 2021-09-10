const { DataTypes } = require('sequelize')

const Log = {
  fields: {
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    meta: {
      type: DataTypes.STRING,
    }
  },
  options: {},
  associations () {}
}

module.exports = { Log }
