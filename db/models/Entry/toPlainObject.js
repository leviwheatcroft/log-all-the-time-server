const dayjs = require('dayjs')

function toPlainObject (mixins) {
  const entry = this

  return {
    ...entry.get(),
    ...entry.Project ? {
      project: entry.Project.get()
    } : {},
    date: dayjs(entry.date),
    ...entry.User ? {
      user: entry.User.get()
    } : {},
    ...entry.EntryTags && entry.EntryTags.length ? {
      tags: entry.EntryTags.map(({ Tag }) => Tag.get())
    } : {
      tags: []
    },
    ...mixins
  }
}

module.exports = {
  toPlainObject
}
