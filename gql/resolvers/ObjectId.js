const {
  GraphQLScalarType
} = require('graphql')
const {
  Types: { ObjectId }
} = require('mongoose')

const ObjectIdMap = {
  ObjectId: new GraphQLScalarType({
    name: 'ObjectId',
    description: 'Mongoose ObjectId',
    serialize (value) {
      return value.toString()
    },
    parseValue (value) {
      return new ObjectId(value)
    },
    parseLiteral (value) {
      return new ObjectId(value)
    }
  })
}

module.exports = { ObjectIdMap }
