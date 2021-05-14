const DocMap = {
  Doc: {
    __resolveType (doc) {
      return doc.constructor.modelName
    }
  }
}

module.exports = { DocMap }
