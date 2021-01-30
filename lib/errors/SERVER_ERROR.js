import { error } from '@lib/log'

export class SERVER_ERROR extends Error {
  code: string = 'SERVER_ERROR'

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
    error(`SERVER_ERROR: ${message}`, extra)
  }
}
import { createError } from 'apollo-errors'

export const UNCAUGHT_ERROR = createError('UNCAUGHT_ERROR', {
  message:
    'A server error has occurred. Please re-try that operation,' +
    ' or contact support if the issue persists'
})