async function ensure (tags, ctx) {
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
      name
    } = tag
    let $tag
    if (id)
      $tag = await Tag.findOne({ where: { id } })
    else
      [$tag] = await Tag.findOrCreate({ where: { name, TeamId } })
    if ($tag.archived) {
      $tag.archived = false
      await $tag.save()
    }
    $tags.push($tag)
  }

  return $tags
}

module.exports = { ensure }
