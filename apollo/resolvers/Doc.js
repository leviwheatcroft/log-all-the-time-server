/* eslint-disable no-prototype-builtins */

const DocMap = {
  Doc: {
    __resolveType (doc) {
      if (
        doc.hasOwnProperty('description') &&
        doc.hasOwnProperty('duration')
      )
        return 'Entry'
      if (
        doc.hasOwnProperty('tagName')
      )
        return 'Tag'

      throw new Error('Doc: undetermined type')
    }
  }
}

module.exports = { DocMap }
