import {
  createError
} from 'apollo-errors'

export const AUTH_ACCESS_TIMEOUT = createError('AUTH_ACCESS_TIMEOUT', {
  message: 'auth failed - access token expired'
})
