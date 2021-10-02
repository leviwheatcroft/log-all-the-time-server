const {
  Op
} = require('sequelize')

async function reconcile (EntryId, tags, ctx) {
  const {
    sequelize: {
      models: {
        EntryTag
      }
    }
  } = this
  const previousTagIds = (await EntryTag.findAll({
    where: { EntryId }
  })).map(({ TagId }) => TagId)

  const currentTagIds = tags.map(({ id }) => id)
  const removed = previousTagIds.filter((id) => !currentTagIds.includes(id))
  const added = currentTagIds.filter((id) => !previousTagIds.includes(id))

  await this.destroy({
    where: {
      EntryId,
      TagId: { [Op.in]: removed }
    }
  })

  await this.bulkCreate(added.map((TagId) => ({ TagId, EntryId })))
}

module.exports = { reconcile }
