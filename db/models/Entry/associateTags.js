async function associateTags (tags, ctx) {
  const entry = this
  const {
    sequelize: {
      models: {
        EntryTag,
        Tag
      }
    },
    id: EntryId
  } = entry
  const $tags = await Tag.findCreateUnarchive(tags, ctx)
  await EntryTag.reconcile(
    EntryId,
    $tags,
    ctx
  )
  return $tags
}

module.exports = { associateTags }
