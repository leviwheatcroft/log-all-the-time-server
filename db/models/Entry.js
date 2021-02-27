const mongoose = require('mongoose')
const Tag = require('./Tag')

const { ObjectId } = mongoose.Schema.Types

const entrySchema = new mongoose.Schema(
  {
    _id: { type: ObjectId, auto: true },
    date: Date,
    description: String,
    duration: Number,
    deleted: Boolean,
    tags: [
      {
        type: ObjectId,
        ref: Tag
      }
    ]
  },
  {
    timestamps: true,
    toObject: {
      getters: true
    }
  }
)

const Entry = mongoose.model('Entry', entrySchema)

module.exports = Entry
