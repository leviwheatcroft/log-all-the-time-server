function toGql () {
  const $project = this
  const {
    id,
    username,
    gravatar
  } = $project
  return {
    id,
    username,
    gravatar
  }
}

module.exports = {
  toGql
}
