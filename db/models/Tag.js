const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const tagSchema = new mongoose.Schema(
  {
    _id: {
      type: ObjectId,
      auto: true
    },
    tagName: String
  },
  {
    timestamps: true,
    toObject: {
      getters: true
    }
  }
)

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag
