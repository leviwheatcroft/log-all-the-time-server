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
    let $tag
    if (id)
      $tag = await Tag.findOne({ where: { id } })
    else
      [$tag] = await Tag.findOrCreate({ where: { tagName, TeamId } })
    if ($tag.archived) {
      $tag.archived = false
      await $tag.save()
    }
    $tags.push($tag)
  }

  return $tags
}

module.exports = { findCreateUnarchive }
