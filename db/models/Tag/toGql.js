function toGql () {
  const $project = this
  const {
    id,
    name,
    archived
  } = $project
  return {
    id,
    name,
    archived
  }
}

module.exports = {
  toGql
}
