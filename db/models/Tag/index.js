const { DataTypes } = require('sequelize')
const { findCreateUnarchive } = require('./findCreateUnarchive')
const { toGql } = require('./toGql')
// const { createOrPopulateTags } = require('./createOrPopulateTags')

const Tag = {
  fields: {
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    tagName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'tagNameByTeamId'
    },
    TeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'tagNameByTeamId'
    }
  },
  options: {
    paranoid: true,
  },
  staticMethods: {
    findCreateUnarchive,
  },
  instanceMethods: {
    toGql
  },
  associations (models) {
    const {
      Entry,
      EntryTag,
      Team,
      Tag
    } = models
    Tag.belongsTo(Team)
    Tag.belongsToMany(Entry, { through: 'EntryTag' })
    Tag.hasMany(EntryTag)
  }
}

module.exports = { Tag }
