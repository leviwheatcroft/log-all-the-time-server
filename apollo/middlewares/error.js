// const { isInstance } = require('apollo-errors')
// const { UNCAUGHT_ERROR } = require('../../lib/errors')

async function error (resolve, root, args, ctx, info) {
  return resolve(root, args, ctx, info)
    .catch((err) => {
      // if (err.extensions && err.extensions.exception)
      //   console.log(err.extensions.exception.stacktrace)
      // if (!isInstance(err)) {
      //   err = new UNCAUGHT_ERROR({
      //     internalData: {
      //       code: err.code,
      //       message: err.message,
      //       stack: err.stack
      //     }
      //   })
      // }
      throw err
    })
}

const errorMap = {
  Query: error,
  Mutation: error
}

module.exports = {
  errorMap
}
