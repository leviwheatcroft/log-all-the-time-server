const { DataTypes } = require('sequelize')
const { toGql } = require('./toGql')
const { withIncludes } = require('./withIncludes')
const { findAllStream } = require('./findAllStream')
const { associateTags } = require('./associateTags')

const Entry = {
  fields: {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
  },
  options: {
    // paranoid: true,
  },
  staticMethods: {
    withIncludes,
    findAllStream
  },
  instanceMethods: {
    associateTags,
    toGql
  },
  associations (models) {
    const {
      Entry,
      EntryTag,
      User,
      Team,
      Project,
      Tag
    } = models
    Entry.belongsTo(Team)
    Entry.belongsTo(User)
    Entry.belongsTo(Project)
    Entry.belongsToMany(Tag, { through: 'EntryTag' })
    Entry.hasMany(EntryTag)
  }
}

module.exports = { Entry }
