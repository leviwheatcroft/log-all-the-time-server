const { DataTypes } = require('sequelize')

const User = {
  fields: {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
    },
    passwordResetExpires: {
      type: DataTypes.DATE
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    basicGrant: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    adminGrant: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  options: {},
  associations ({ User, Team }) {
    User.belongsTo(Team)
  }
}

module.exports = { User }
