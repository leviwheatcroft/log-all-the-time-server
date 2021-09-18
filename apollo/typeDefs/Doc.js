const gql = require('graphql-tag')

const Doc = gql`
  union Doc = Entry | Tag
`

module.exports = {
  Doc
}
