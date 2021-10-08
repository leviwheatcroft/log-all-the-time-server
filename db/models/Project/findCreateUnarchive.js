async function findCreateUnarchive (project, ctx) {
  const Project = this
  const {
    id,
    name
  } = project
  const {
    user: {
      TeamId
    }
  } = ctx

  const [$project] = await Project.upsert({
    ...id ? { id } : {},
    name,
    TeamId,
    archived: false
  })

  return $project
}

module.exports = { findCreateUnarchive }
