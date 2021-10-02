function toGql () {
  const $project = this
  const {
    id,
    projectName,
    archived
  } = $project
  return {
    id,
    projectName,
    archived
  }
}

module.exports = {
  toGql
}
