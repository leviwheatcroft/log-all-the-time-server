const { AuthAccessTimeoutError } = require('./AuthAccessTimeoutError')
const { AuthBadEmailError } = require('./AuthBadEmailError')
const { AuthBadPasswordError } = require('./AuthBadPasswordError')
const { AuthFailedError } = require('./AuthFailedError')
const { AuthInactiveUserError } = require('./AuthInactiveUserError')
const { AuthRefreshTimeoutError } = require('./AuthRefreshTimeoutError')
const { AuthUnauthorizedError } = require('./AuthUnauthorizedError')
const { MidnightUtcError } = require('./MidnightUtcError')
const { NewUserError } = require('./NewUserError')

module.exports = {
  AuthAccessTimeoutError,
  AuthBadEmailError,
  AuthBadPasswordError,
  AuthFailedError,
  AuthInactiveUserError,
  AuthRefreshTimeoutError,
  AuthUnauthorizedError,
  MidnightUtcError,
  NewUserError,
}
