import { createError } from 'apollo-errors'

export const UNCAUGHT_ERROR = createError('UNCAUGHT_ERROR', {
  message:
    'A server error has occurred. Please re-try that operation,' +
    ' or contact support if the issue persists'
})