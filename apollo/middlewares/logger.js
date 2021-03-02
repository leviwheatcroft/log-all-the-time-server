async function logger (resolve, root, args, ctx, info) {
  const {
    fieldName
  } = info
  console.log(`operation: ${ctx.req.body.operationName}`)
  console.log(ctx.req.body.variables)

  const result = await resolve(root, args, ctx, info)

  console.log(result)

  return result
}

const loggerMap = {
  Query: logger,
  Mutation: logger
}

module.exports = {
  loggerMap
}
