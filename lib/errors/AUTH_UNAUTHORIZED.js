const { createError } = require('apollo-errors')

const AUTH_UNAUTHORIZED = createError('UNAUTHORIZED', {
  message: 'unauthorized to perform action',
  options: {
    showPath: true,
    showLocation: true
  }
})

module.exports = {
  AUTH_UNAUTHORIZED
}
