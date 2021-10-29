const pc = require('../../lib/prettyConsole')
const {
  verbose
} = require('../../lib/log')

const entryEndpoints = [
  // 'EntryQ'
  'EntryFilterQ'
]

async function logger (resolve, root, args, ctx, info) {
  const {
    fieldName
  } = info
  const result = await resolve(root, args, ctx, info)

  if (process.env.NODE_ENV !== 'production') {
    pc.line()
    pc.bl(`Operation: ${ctx.req.body.operationName}`)
    pc.bl(`FieldName: ${fieldName}`)
    pc.inspect(ctx.req.body.variables)
    const timer = new pc.Timer()

    if (entryEndpoints.includes(ctx.req.body.operationName)) {
      const table = new pc.Table()
      result.docs.forEach((e) => table.push(e))
      table.write()
    } else {
      // eslint-disable-next-line no-console
      console.log(result)
    }
    pc.bgBl(`elapsed: ${timer.elapsed()}`)
  } else {
    verbose('qraphql operation', {
      operation: ctx.req.body.operationName,
      fieldName,
      variables: ctx.req.body.varialbes
    })
  }

  return result
}

const loggerMap = {
  Query: logger,
  Mutation: logger
}

module.exports = {
  loggerMap
}
