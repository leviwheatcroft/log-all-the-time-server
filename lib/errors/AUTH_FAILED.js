const { createError } = require('apollo-errors')

const AUTH_FAILED = createError('AUTH_FAILED', {
  message: 'auth failed - token not provided or failed verification',
  options: {
    showPath: true,
    showLocation: true
  }
})

module.exports = {
  AUTH_FAILED
}
