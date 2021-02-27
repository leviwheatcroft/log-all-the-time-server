const { ApolloError } = require('apollo-server')

class RangeError extends ApolloError {
  constructor (message = 'Range Error', extensions) {
    super(message, 'RANGE_ERROR', extensions)
  }
}

module.exports = {
  RangeError
}
// export class RANGE_ERROR extends RangeError {
//   code: string = 'RANGE_ERROR'
//
//   constructor (public message: string, extra?: ErrorExtra) {
//     super()
//     Error.captureStackTrace(this, this.constructor)
//     extra = Object.assign({
//       data: {}
//     }, extra)
//     Object.assign(this, {
//       message,
//       ...extra
//     })
//   }
// }
