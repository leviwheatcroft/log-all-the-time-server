// const tml = require('../lib/tml')
const {
  error,
  verbose
} = require('../lib/log')

const reportableErrors = [
  'INTERNAL_SERVER_ERROR',
  'GRAPHQL_VALIDATION_FAILED'
]

// quiet is used when running tests. not used by apollo server
function formatError (err, quiet) {
  const {
    message,
    path,
    extensions: {
      code,
      data,
      exposedData,
      // exception
    }
  } = err

  if (!quiet) {
    const meta = {
      code,
      data,
      exposedData,
      path
    }
    if (reportableErrors.includes(code))
      error(message, meta)
    else
      verbose(message, meta)
    // tml.line()
    // tml.bl(`Error Code: ${code}`)
    // if (path)
    //   tml.wh(`Path: ${path}`)
    //
    // if (code === 'INTERNAL_SERVER_ERROR') {
    //   tml.wh(`Message: ${error.message}`)
    //   tml.wh('extensions.exception.stacktrace')
    //   console.info(exception.stacktrace)
    // }
    //
    // if (code === 'GRAPHQL_VALIDATION_FAILED')
    //   tml.wh(`Message: ${error.message}`)
    //
    // if (data) {
    //   tml.wh('extensions.data:')
    //   console.info(data)
    // }
    // if (exposedData) {
    //   tml.wh('extensions.exposedData:')
    //   console.info(exposedData)
    // }
  }

  return {
    message,
    code,
    exposedData
  }
}

module.exports = {
  formatError
}
