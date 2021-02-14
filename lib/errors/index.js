const { AuthAccessTimeoutError } = require('./AuthAccessTimeoutError')
const { AuthFailedError } = require('./AuthFailedError')
const { AUTH_REFRESH_TIMEOUT } = require('./AUTH_REFRESH_TIMEOUT')
const { AUTH_UNAUTHORIZED } = require('./AUTH_UNAUTHORIZED')
const { RANGE_ERROR } = require('./RANGE_ERROR')
const { UNCAUGHT_ERROR } = require('./UNCAUGHT_ERROR')

module.exports = {
  AuthAccessTimeoutError,
  AuthFailedError,
  AUTH_REFRESH_TIMEOUT,
  AUTH_UNAUTHORIZED,
  RANGE_ERROR,
  UNCAUGHT_ERROR
}
