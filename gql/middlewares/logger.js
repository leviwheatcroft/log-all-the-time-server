async function logger (resolve, root, args, ctx, info) {
  const {
    fieldName
  } = info
  console.log(fieldName)
  console.log(ctx.req.body)

  const result = await resolve(root, args, ctx, info)

  return result
}

const loggerMap = {
  Query: logger,
  Mutation: logger
}

module.exports = {
  loggerMap
}
