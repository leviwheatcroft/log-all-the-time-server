const mongoose = require('mongoose')
const Tag = require('./Tag')
const User = require('./User')
const Team = require('./Team')

const { ObjectId } = mongoose.Schema.Types

const entrySchema = new mongoose.Schema(
  {
    _id: { type: ObjectId, auto: true },
    user: {
      type: ObjectId,
      ref: User
    },
    team: {
      type: ObjectId,
      ref: Team
    },
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
