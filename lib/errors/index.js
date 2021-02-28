const { AuthAccessTimeoutError } = require('./AuthAccessTimeoutError')
const { AuthFailedError } = require('./AuthFailedError')
const { RangeError } = require('./RangeError')
const { AuthRefreshTimeout } = require('./AuthRefreshTimeout')
const { AUTH_UNAUTHORIZED } = require('./AUTH_UNAUTHORIZED')
const { UNCAUGHT_ERROR } = require('./UNCAUGHT_ERROR')
const { NewUserError } = require('./NewUserError')

module.exports = {
  AuthAccessTimeoutError,
  AuthFailedError,
  RangeError,
  AuthRefreshTimeout,
  NewUserError,
  AUTH_UNAUTHORIZED,
  UNCAUGHT_ERROR
}
