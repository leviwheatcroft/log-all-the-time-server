/* eslint-disable no-prototype-builtins */

const DocMap = {
  Doc: {
    __resolveType (doc) {
      // TODO: is this necessary if __typenames are defined by .toGql() ?
      // couldn't find much in the docs:
      // https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/
      return doc.__typename
      // if (
      //   doc.hasOwnProperty('description') &&
      //   doc.hasOwnProperty('duration')
      // )
      //   return 'Entry'
      // if (
      //   doc.hasOwnProperty('name')
      // )
      //   return 'Tag'
      //
      // throw new Error('Doc: undetermined type')
    }
  }
}

module.exports = { DocMap }
