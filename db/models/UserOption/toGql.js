function toGql () {
  const $userOptions = this
  const {
    exportDateFormat,
    exportDurationFormat
  } = $userOptions
  return {
    exportDateFormat,
    exportDurationFormat
  }
}

module.exports = {
  toGql
}
