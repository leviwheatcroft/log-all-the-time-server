const { AuthAccessTimeoutError } = require('./AuthAccessTimeoutError')
const { AuthFailedError } = require('./AuthFailedError')
// const { RangeError } = require('./RangeError')
const { AuthRefreshTimeoutError } = require('./AuthRefreshTimeoutError')
const { AUTH_UNAUTHORIZED } = require('./AUTH_UNAUTHORIZED')
// const { UNCAUGHT_ERROR } = require('./UNCAUGHT_ERROR')
const { NewUserError } = require('./NewUserError')
const { MidnightUtcError } = require('./MidnightUtcError')
const { AuthBadEmailError } = require('./AuthBadEmailError')
const { AuthBadPasswordError } = require('./AuthBadPasswordError')
const { AuthInactiveUserError } = require('./AuthInactiveUserError')

module.exports = {
  AuthBadEmailError,
  AuthBadPasswordError,
  AuthInactiveUserError,
  AuthAccessTimeoutError,
  AuthFailedError,
  // RangeError,
  AuthRefreshTimeoutError,
  NewUserError,
  MidnightUtcError,
  AUTH_UNAUTHORIZED,
  // UNCAUGHT_ERROR
}
