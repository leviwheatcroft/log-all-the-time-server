const bcrypt = require('bcrypt')
const crypto = require('crypto')
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
  options: {
    hooks: {
      async beforeSave (user, options) {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hash(user.password, salt)
        }
      }
    }
  },
  instanceMethods: {
    comparePassword (candidatePassword) {
      // returns promise, can `await user.comparePassword()`
      return bcrypt.compare(candidatePassword, this.password)
    },
    getGravatar (size = 200) {
      const md5 = crypto.createHash('md5').update(this.email).digest('hex')
      return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`
    }
  },
  associations ({ User, Team }) {
    User.belongsTo(Team)
  }
}

module.exports = { User }
