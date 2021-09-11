const { DataTypes } = require('sequelize')

const Entry = {
  fields: {
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
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
  options: {},
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
