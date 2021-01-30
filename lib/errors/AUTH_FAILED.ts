import {
  createError
} from 'apollo-errors'

export const AUTH_FAILED = createError('AUTH_FAILED', {
  message: 'auth failed - token not provided or failed verification'
})
