const tml = require('../../lib/tml')

const entryEndpoints = [
  // 'EntryQ'
  'EntryFilterQ'
]

async function logger (resolve, root, args, ctx, info) {
  const {
    fieldName
  } = info
  tml.line()
  tml.bl(`Operation: ${ctx.req.body.operationName}`)
  tml.bl(`FieldName: ${fieldName}`)
  tml.inspect(ctx.req.body.variables)
  const timer = new tml.Timer()

  const result = await resolve(root, args, ctx, info)

  if (entryEndpoints.includes(ctx.req.body.operationName)) {
    const table = new tml.Table()
    result.docs.forEach((e) => table.push(e))
    table.write()
  } else {
    // eslint-disable-next-line no-console
    console.log(result)
  }
  tml.bgBl(`elapsed: ${timer.elapsed()}`)

  return result
}

const loggerMap = {
  Query: logger,
  Mutation: logger
}

module.exports = {
  loggerMap
}
