const gql = require('graphql-tag')

const Tokens = gql`
type Tokens {
  accessToken: Token!
  refreshToken: Token!
}
`

module.exports = {
  Tokens
}
