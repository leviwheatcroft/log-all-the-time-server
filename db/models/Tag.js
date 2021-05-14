const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
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
    },
    archived: Boolean
  },
  {
    timestamps: true,
    toObject: {
      getters: true
    }
  }
)

tagSchema.plugin(mongoosePaginate)

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag
