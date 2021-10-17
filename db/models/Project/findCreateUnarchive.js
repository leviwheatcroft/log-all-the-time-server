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

  let $project = await Project.findOne({
    where: {
      ...id ? { id } : {},
      name,
      TeamId
    }
  })

  if ($project && !$project.get('archived'))
    return $project

  if ($project && $project.get('archived')) {
    $project.set('archived', false)
    await $project.save()
  } else {
    $project = await Project.create({
      name,
      TeamId
    })
  }

  return $project
}

module.exports = { findCreateUnarchive }
