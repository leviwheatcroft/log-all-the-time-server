/**
 *
 * ## Error Reporting
 * Errors are handled both on the server and in the client
 * NODE_ENV is not relevant to what information should be reported, because
 * the server is always private and can log sensitive information.
*/

// const tml = require('../lib/tml')
const {
  formatError: formatApolloError,
  isInstance: isApolloErrorInstance
} = require('apollo-errors')
const {
  error,
  verbose,
  // verbose
} = require('../lib/log')

// quiet is used when running tests. not used by apollo server
function formatError (err, quiet) {
  if (quiet)
    return formatApolloError(err)

  const { originalError } = err

  if (isApolloErrorInstance(originalError)) {
    // these are the nice errors which can be handled by the client
    const {
      name,
    } = originalError
    verbose(`Returned Error: ${name}`)
  } else {
    // these are the nasty untrapped errors
    const {
      name,
      stack
    } = originalError
    error(`Threw Unexpected Error: ${name}`)
    error(stack)
  }
  return formatApolloError(err)
}

module.exports = {
  formatError
}
