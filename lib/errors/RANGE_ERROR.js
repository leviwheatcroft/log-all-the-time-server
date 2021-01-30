const { createError } = require('apollo-errors')

const RANGE_ERROR = createError('RANGE_ERROR', {
  message: 'value out of range',
  options: {
    showPath: true,
    showLocation: true
  }
})

module.exports = {
  RANGE_ERROR
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
