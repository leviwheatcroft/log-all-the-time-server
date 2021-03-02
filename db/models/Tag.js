const mongoose = require('mongoose')
const Team = require('./Team')

const { ObjectId } = mongoose.Schema.Types

const tagSchema = new mongoose.Schema(
  {
    _id: {
      type: ObjectId,
      auto: true
    },
    tagName: String,
    team: {
      type: ObjectId,
      ref: Team
    }
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
