function toGql () {
  const $userDialog = this
  const entries = Object.entries($userDialog.get())
    .filter(([key]) => {
      if (
        key === 'id' ||
        key === 'createdAt' ||
        key === 'updatedAt' ||
        key === 'UserId'
      )
        return false
      return true
    })
    .map(([key, hidden]) => ({ key, hidden }))
  return entries
}

module.exports = {
  toGql
}
