const { Op } = require('sequelize')

function withIncludes (query = {}, ctx = {}) {
  const {
    sequelize: {
      models: {
        EntryTag,
        Tag,
        User,
        Project
      }
    }
  } = this
  // tags === true
  // no tags filter, populate EntryTag & Tag
  // tags === false
  // no tags filter, don't populate EntryTag or Tag
  // Array.isArray(tags)
  // filter and populate
  const {
    tags = true,
    user = true,
    project = true
  } = ctx
  return {
    ...query,
    include: [
      ...tags !== false ? [
        {
          model: EntryTag,
          include: {
            model: Tag
          }
        }
      ] : [],
      // ...tags !== false ? [
      //   {
      //     model: EntryTag,
      //     ...Array.isArray(tags) ? {
      //       where: {
      //         TagId: { [Op.in]: tags }
      //       },
      //       required: true
      //     } : {},
      //     include: {
      //       model: Tag
      //     }
      //   }
      // ] : [],
      ...user ? [{
        model: User
      }] : [],
      ...project ? [{
        model: Project
      }] : []
    ]
  }
}

module.exports = { withIncludes }
