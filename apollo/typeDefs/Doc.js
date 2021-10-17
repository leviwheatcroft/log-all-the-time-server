const gql = require('graphql-tag')

const Doc = gql`
  union Doc = Entry | Tag | Project
`

module.exports = {
  Doc
}
