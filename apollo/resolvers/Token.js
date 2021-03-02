const { GraphQLScalarType } = require('graphql')
const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env

const TokenMap = {
  Token: new GraphQLScalarType({
    name: 'Token',
    description: 'Custom Token Scalar',
    serialize (value) {
      return jwt.sign(value, JWT_SECRET)
    },
    parseValue (value) {
      return jwt.verify(value, JWT_SECRET)
    },
    parseLiteral (value) {
      return jwt.verify(value, JWT_SECRET)
    }
  })
}

module.exports = {
  TokenMap
}
