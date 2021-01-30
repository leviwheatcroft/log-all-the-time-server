import {
  createError
} from 'apollo-errors'

export const AUTH_UNAUTHORIZED = createError('UNAUTHORIZED', {
  message: 'unauthorized to perform action'
})