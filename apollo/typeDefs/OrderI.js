const gql = require('graphql-tag')

const OrderI = gql`
input OrderI {
  createdAt: String
  date: String
}
`

module.exports = {
  OrderI
}
