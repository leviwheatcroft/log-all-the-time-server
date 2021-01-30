import { createError } from 'apollo-errors'

export const XERO_AT_EXPIRED = createError('XERO_AT_EXPIRED', {
  message: 'users stored xero access token has expired'
})