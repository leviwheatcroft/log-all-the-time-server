function toGql () {
  const $project = this
  const {
    id,
    tagName,
    archived
  } = $project
  return {
    id,
    tagName,
    archived
  }
}

module.exports = {
  toGql
}
