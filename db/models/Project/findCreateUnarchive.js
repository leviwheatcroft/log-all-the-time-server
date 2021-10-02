async function findCreateUnarchive (project, ctx) {
  const Project = this
  const {
    id,
    projectName
  } = project
  const {
    user: {
      TeamId
    }
  } = ctx

  const [$project] = await Project.upsert({
    ...id ? { id } : {},
    projectName,
    TeamId,
    archived: false
  })

  return $project
}

module.exports = { findCreateUnarchive }
