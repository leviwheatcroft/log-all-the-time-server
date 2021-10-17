const dayjs = require('dayjs')

function toGql (mixins = {}) {
  const $entry = this
  const {
    id,
    description,
    duration,
    createdAt
  } = $entry

  const date = dayjs($entry.date)

  let tags
  if (mixins.tags)
    tags = mixins.tags
  else if (mixins.$tags)
    tags = mixins.$tags.map((t) => t.toGql())
  else if ($entry.EntryTags)
    tags = $entry.EntryTags.map(({ Tag }) => Tag.toGql())
  else
    throw new Error('Entry.toGql tags not provided')

  const project = $entry.Project ?
    $entry.Project.toGql() :
    mixins.project
  if (!project)
    throw new Error('Entry.toGql project not provided')

  const user = $entry.User ?
    $entry.User.toGql() :
    mixins.user
  if (!user)
    throw new Error('Entry.toGql user not provided')

  return {
    __typename: 'Entry',
    id,
    date,
    description,
    duration,
    tags,
    project,
    user,
    createdAt
  }
}

module.exports = {
  toGql
}
