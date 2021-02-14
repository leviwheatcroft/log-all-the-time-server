// tokens are signed / verified (encrypted / decrypted) on the Token GraphQl
// type
const { JWT_ACCESS_TOKEN_EXPIRY } = process.env
const { JWT_REFRESH_TOKEN_EXPIRY } = process.env

function getAccessToken (user) {
  return {
    userId: user._id,
    grants: {
      // organisationId: user.organisationId,
      basic: user.basicGrant
      // admin: user.adminGrant
    },
    expiresAt: new Date(Date.now() + parseInt(JWT_ACCESS_TOKEN_EXPIRY, 10))
  }
}
function getRefreshToken (user) {
  return {
    userId: user._id,
    expiresAt: new Date(Date.now() + parseInt(JWT_REFRESH_TOKEN_EXPIRY, 10))
  }
}
function getTokens (user) {
  return {
    accessToken: getAccessToken(user),
    refreshToken: getRefreshToken(user)
  }
}

module.exports = {
  getAccessToken,
  getRefreshToken,
  getTokens
}
