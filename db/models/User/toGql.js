function toGql () {
  const $user = this
  const {
    id,
    name,
    gravatar,
    UserDialog,
    UserOption
  } = $user
  return {
    id,
    name,
    gravatar,
    ...UserDialog ? { dialogs: UserDialog.toGql() } : {},
    ...UserOption ? { options: UserOption.toGql() } : {}
  }
}

module.exports = {
  toGql
}
