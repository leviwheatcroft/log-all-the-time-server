import {
  createError
} from 'apollo-errors'

export const ORG_MISSING = createError('ORG_MISSING', {
  message: 'ctx missing Org instance'
})
