const {
  GraphQLScalarType
} = require('graphql')

const DateMap = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Custom Date Scalar',
    serialize (value) {
      return value.valueOf()
    },
    parseValue (value) {
      return new Date(value)
    },
    parseLiteral (value) {
      return new Date(parseInt(value, 10))
    }
  })
}

module.exports = { DateMap }
