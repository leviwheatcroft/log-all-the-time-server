const { AuthAccessTimeoutError } = require('./AuthAccessTimeoutError')
const { AuthFailedError } = require('./AuthFailedError')
const { RangeError } = require('./RangeError')
const { AUTH_REFRESH_TIMEOUT } = require('./AUTH_REFRESH_TIMEOUT')
const { AUTH_UNAUTHORIZED } = require('./AUTH_UNAUTHORIZED')
const { UNCAUGHT_ERROR } = require('./UNCAUGHT_ERROR')

module.exports = {
  AuthAccessTimeoutError,
  AuthFailedError,
  RangeError,
  AUTH_REFRESH_TIMEOUT,
  AUTH_UNAUTHORIZED,
  UNCAUGHT_ERROR
}
