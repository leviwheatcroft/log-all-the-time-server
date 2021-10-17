function toGql () {
  const $project = this
  const {
    id,
    name,
    archived
  } = $project
  return {
    __typename: 'Tag',
    id,
    name,
    archived
  }
}

module.exports = {
  toGql
}
