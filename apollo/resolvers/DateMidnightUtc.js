const {
  GraphQLScalarType
} = require('graphql')
const {
  MidnightUtcError
} = require('../../lib/errors')

const DateMidnightUtcMap = {
  DateMidnightUtc: new GraphQLScalarType({
    name: 'DateMidnightUtc',
    description: 'Custom Date Midnight UTC Scalar',
    serialize (date) {
      if (
        date.getUTCHours() !== 0 ||
        date.getUTCMinutes() !== 0 ||
        date.getUTCSeconds() !== 0 ||
        date.getUTCMilliseconds() !== 0
      ) {
        throw new MidnightUtcError(
          'date is not Midnight UTC',
          {
            date
          }
        )
      }
      return date.getTime()
    },
    parseValue (value) {
      const date = new Date(value)
      if (
        date.getUTCHours() !== 0 ||
        date.getUTCMinutes() !== 0 ||
        date.getUTCSeconds() !== 0 ||
        date.getUTCMilliseconds() !== 0
      ) {
        throw new MidnightUtcError(
          'date is not Midnight UTC',
          {
            rawDate: value,
            parsed: date
          }
        )
      }
      return new Date(value)
    },
    parseLiteral (value) {
      return new Date(parseInt(value, 10))
    }
  })
}

module.exports = { DateMidnightUtcMap }
