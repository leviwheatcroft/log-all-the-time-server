const tml = require('../lib/tml')

// quiet is used when running tests. not used by apollo server
function formatError (error, quiet) {
  const {
    message,
    path,
    extensions: {
      code,
      data,
      exposedData,
      exception
    }
  } = error

  if (!quiet) {
    tml.line()
    tml.bl(`Error Code: ${code}`)
    if (path)
      tml.wh(`Path: ${path}`)

    if (code === 'INTERNAL_SERVER_ERROR') {
      tml.wh(`Message: ${error.message}`)
      tml.wh('extensions.exception.stacktrace')
      console.info(exception.stacktrace)
    }

    if (code === 'GRAPHQL_VALIDATION_FAILED')
      tml.wh(`Message: ${error.message}`)

    if (data) {
      tml.wh('extensions.data:')
      console.info(data)
    }
    if (exposedData) {
      tml.wh('extensions.exposedData:')
      console.info(exposedData)
    }
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
