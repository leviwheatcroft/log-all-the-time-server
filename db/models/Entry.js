const mongoose = require('mongoose')
const Tag = require('./Tag')

const { ObjectId } = mongoose.Schema.Types

const entrySchema = new mongoose.Schema({
  _id: { type: ObjectId, auto: true },
  date: Date,
  raw: String,
  description: String,
  timeStart: String,
  timeEnd: String,
  duration: Number,
  tags: [
    {
      type: ObjectId,
      ref: Tag
    }
  ]
}, { timestamps: true })

const Entry = mongoose.model('Entry', entrySchema)

module.exports = Entry
