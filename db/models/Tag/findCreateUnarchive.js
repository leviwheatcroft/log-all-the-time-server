async function findCreateUnarchive (tags, ctx) {
  const {
    sequelize: {
      models: {
        Tag
      }
    }
  } = this
  const {
    user: {
      TeamId
    }
  } = ctx
  const $tags = []
  // eslint-disable-next-line no-restricted-syntax
  for await (const tag of tags) {
    const {
      id,
      tagName
    } = tag
    const [$tag] = await Tag.upsert({
      ...id ? { id } : {},
      tagName,
      TeamId,
      archived: false
    })
    $tags.push($tag)
  }
  return $tags
}

module.exports = { findCreateUnarchive }
