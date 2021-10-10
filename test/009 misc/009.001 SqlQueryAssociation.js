const test = require('ava')
const { Sequelize, DataTypes, Op } = require('sequelize')

test.before(async (t) => {
  const sql = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging () {}
  })

  sql.define('Entry', { name: DataTypes.STRING }, { timestamps: false })
  sql.define('Tag', { name: DataTypes.STRING }, { timestamps: false })
  sql.define('EntryTag', {}, { timestamps: false })
  const {
    Entry,
    Tag,
    EntryTag
  } = sql.models
  Entry.belongsToMany(Tag, { through: EntryTag })
  Entry.hasMany(EntryTag)
  Tag.belongsToMany(Entry, { through: EntryTag })
  Tag.hasMany(EntryTag)
  EntryTag.belongsTo(Entry)
  EntryTag.belongsTo(Tag)
  await sql.authenticate()
  await sql.sync()

  // create entry1 with tags [ tag1, tag2 ]
  // create entry2 with tags [ tag2 ]

  const entry1 = await Entry.create({ id: 1, name: 'entry 1' })
  const entry2 = await Entry.create({ id: 2, name: 'entry 2' })
  const tag1 = await Tag.create({ id: 1, name: 'tag 1' })
  const tag2 = await Tag.create({ id: 2, name: 'tag 2' })

  await entry1.addTag(tag1)
  await entry1.addTag(tag2)
  await entry2.addTag(tag2)

  t.context.sql = sql
})

test.serial('SqlQueryAssociation', async (t) => {
  const {
    sql
  } = t.context
  const {
    Entry,
    Tag,
    EntryTag
  } = sql.models
  const tags = [1]
  const result = await Entry.findAll({
    where: Sequelize.literal(`
      EXISTS(
        SELECT *
        FROM EntryTags
        WHERE
          EntryTags.EntryId = Entry.id AND
          EntryTags.TagId IN (${tags.join(',')})
      )
    `),
    include: [{ model: EntryTag, include: Tag }]
  })
  t.truthy(result[0].EntryTags.length === 2)
})

test.serial('SqlQueryAssociation where syntax', async (t) => {
  const {
    sql
  } = t.context
  const {
    Entry,
    Tag,
    EntryTag
  } = sql.models
  const tags = [1]
  const result = await Entry.findAll({
    where: {
      [Op.and]: [
        Sequelize.literal(`
          EXISTS(
            SELECT *
            FROM EntryTags
            WHERE
              EntryTags.EntryId = Entry.id AND
              EntryTags.TagId IN (${tags.join(',')})
          )
        `),
        {}
      ]
    },
    include: [{ model: EntryTag, include: Tag }]
  })
  t.truthy(result[0].EntryTags.length === 2)
})
