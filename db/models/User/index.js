const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { DataTypes } = require('sequelize')
const { toGql } = require('./toGql')
const { comparePassword } = require('./comparePassword')

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
    name: {
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
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    gravatar: {
      type: DataTypes.VIRTUAL,
      get () {
        // by default the size returned is 80 x 80px
        // you can request different sizes by adding &s=${size} to the end as in
        // https://gravatar.com/avatar/xxx?d=retro&s=200
        // see:
        // https://en.gravatar.com/site/implement/images/
        const md5 = crypto.createHash('md5').update(this.email).digest('hex')
        return `https://gravatar.com/avatar/${md5}?d=retro`
      }
    }
  },
  options: {
    // paranoid: true,
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
    comparePassword,
    toGql
  },
  associations ({ User, Team }) {
    User.belongsTo(Team)
  }
}

module.exports = { User }
