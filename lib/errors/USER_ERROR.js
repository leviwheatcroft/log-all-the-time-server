import { verbose } from '@lib/log'

export class USER_ERROR extends Error {
  code: string = 'USER_ERROR'

  constructor (public message: string, extra?: ErrorExtra) {
    super()
    Error.captureStackTrace(this, this.constructor)
    extra = Object.assign({
      returnTo: '/',
      data: {}
    }, extra)
    Object.assign(this, {
      message,
      ...extra
    })
    verbose(`USER_ERROR: ${message}`, extra.data)
  }
}
