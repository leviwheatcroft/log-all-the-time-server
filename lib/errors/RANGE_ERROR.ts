export class RANGE_ERROR extends RangeError {
  code: string = 'RANGE_ERROR'

  constructor (public message: string, extra?: ErrorExtra) {
    super()
    Error.captureStackTrace(this, this.constructor)
    extra = Object.assign({
      data: {}
    }, extra)
    Object.assign(this, {
      message,
      ...extra
    })
  }
}