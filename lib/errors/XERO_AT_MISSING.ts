import {
  createError
} from 'apollo-errors'

export const XERO_AT_MISSING = createError('XERO_AT_MISSING', {
  message: 'user has no stored xero access token'
})