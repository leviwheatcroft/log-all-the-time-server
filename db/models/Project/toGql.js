function toGql () {
  const $project = this
  const {
    id,
    name,
    archived
  } = $project
  return {
    __typename: 'Project',
    id,
    name,
    archived
  }
}

module.exports = {
  toGql
}
