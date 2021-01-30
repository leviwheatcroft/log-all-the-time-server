const gql = require('graphql-tag')

const Query = gql`
type Query {
  UserQ: User!
}
`

module.exports = {
  Query
}
