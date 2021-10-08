function toGql () {
  const $project = this
  const {
    id,
    name,
    gravatar
  } = $project
  return {
    id,
    name,
    gravatar
  }
}

module.exports = {
  toGql
}
